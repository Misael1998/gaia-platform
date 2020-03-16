const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const moment = require("moment");
const mssql = require("mssql");

//@desc     insert request with products into DB
//@route    post     /api/request
//@access   Private
exports.request = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(400, "Validation errors", errors.array(), res);
    }
    const { emissionDate, shipping, requestType, deliveryType } = req.body;
    let products = req.body.products.map(product => {
        if (product.quantity < 1 || product.quantity === null) {
            return errorResponse(
                400,
                "Validation errors", [{ msg: "Quantity value in products must be a number greater than 0" }],
                res
            );
        }
        tmp = {
            product: product.product,
            quantity: product.quantity,
            inserted: false
        };
        return tmp;
    });
    try {
        let userType = [];
        const { userId, role } = req.user;
        if (role === "individual") {
            userType = [null, userId];
        }
        if (role === "enterprise") {
            userType = [userId, null];
        }

        const request = await new mssql.Request()
            .input("deliveryID", mssql.Int, deliveryType)
            .input("requestTypeID", mssql.Int, requestType)
            .input("date", mssql.DateTime, emissionDate)
            .input("shipping", mssql.Float, shipping)
            .input("eClientID", mssql.Int, userType[0])
            .input("iClientID", mssql.Int, userType[1])
            .output("msj", mssql.VarChar(100))
            .output("err", mssql.VarChar(100))
            .output("id", mssql.Int)
            .execute("SP_INSERT_REQUEST");

        const { msj } = request.output;
        if (msj !== "success") {
            return errorResponse(400, "Bad request", [{ msj: msj }], res);
        }

        for (let product of products) {
            if (!product.inserted) {
                const productsRequest = await new mssql.Request()
                    .input("productId", mssql.Int, product.product)
                    .input("requestId", mssql.Int, request.output.id)
                    .input("quantity", mssql.Int, product.quantity)
                    .output("msj", mssql.VarChar(100))
                    .output("err", mssql.VarChar(100))
                    .execute("SP_INSERT_PRODUCTS_IN_ORDER");
                if (productsRequest.output.msj === "success") {
                    product.inserted = true;
                }
            }
        }

        return res.status(201).json({
            success: true,
            msg: "request palced",
            data: products
        });
    } catch (err) {
        console.log(err.message);
        if (err.number === 547) {
            if (err.procName === "SP_INSERT_PRODUCTS_IN_ORDER") {
                return errorResponse(
                    202,
                    "Request acepted", [{
                        msg: "Order placed with or without some produts, products.product values may be invalids",
                        data: products
                    }],
                    res
                );
            }
            return errorResponse(
                400,
                "Bad request", [{ msg: "requestType or deliveryType values may be invalids" }],
                res
            );
        }
        return errorResponse(
            500,
            "server error", [{ msg: "internal server error" }],
            res
        );
    }
};


//@desc     request details data
//@route    GET     /api/request/:id/details
//@access   Private, individual enterprise
exports.requestDetails = async(req, res, next) => {
    console.log(req);
    const { userId, role } = req.user

    if (role === 'individual') {
        try {
            const query = await new mssql.Request()
                .input("id", mssql.Int, userId)
                .query(
                    "SELECT idRequests, " +
                    "emission_date, " +
                    "deliveryType, " +
                    "paymentMethod, " +
                    "product, " +
                    "quantity, " +
                    "subtotal " +
                    "FROM [dbo].[FT_GET_REQUEST_DETAIL_INDIVIDUAL](@id)"
                );
            const data = query.recordset;
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found ",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Successful",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: "server error"
            });
        }
    }

    if (role === 'enterprise') {
        try {
            const query = await new mssql.Request()
                .input("id", mssql.Int, userId)
                .query(
                    "SELECT idRequests, " +
                    "emission_date, " +
                    "deliveryType, " +
                    "paymentMethod, " +
                    "product, " +
                    "quantity, " +
                    "subtotal " +
                    "FROM [dbo].[FT_GET_REQUEST_DETAIL_ENTERPRISE](@id)"
                );
            const data = query.recordset;
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found ",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Successful",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: "server error"
            });
        }
    }
};