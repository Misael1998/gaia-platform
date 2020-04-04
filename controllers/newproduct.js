const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const mssql = require("mssql");

//@desc     Save a new product
//@route    POST    /api/newproduct
//@access   Private (Employee)

exports.newProduct = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(400, "Validation erros", errors.array(), res);
    }

    const {
        name,
        idCategory,
        idSarType,
        description
    } = req.body;

    let prices = req.body.prices.map(price => {
        if (price.price === 0) {
            return errorResponse(400, "Validations errors",
                [{
                    msg: "Price value of product don't can be 0"
                }],
                res
            );
        }
        tmp = {
            name: name,
            idCompanyType: price.idCompanyType,
            price: price.price,
            inserted: false
        };
        return tmp;
    });
    try {
        const { userId } = req.user;
        const query = await new mssql.Request()
            .input("userEmployeeId", mssql.Int, userId)
            .input("name", mssql.VarChar(45), name)
            .input("idCategory", mssql.Int, idCategory)
            .input("idSarType", mssql.Int, idSarType)
            .input("description", mssql.VarChar(200), description)
            .output("idProduct", mssql.Int)
            .output("msj", mssql.VarChar(100))
            .output("err", mssql.VarChar(100))
            .execute("SP_INSERT_NEW_PRODUCT")


        if (query.output.msj != "success") {
            return errorResponse(400, "Product not inserted", [{ msj: query.output.msj }], res)
        }

        for (let price of prices) {
            if (!price.inserted) {
                const queryPrices = await new mssql.Request()
                    .input("idCompanyType", mssql.Int, price.idCompanyType)
                    .input("price", mssql.Float, price.price)
                    .input("idProduct", mssql.Int, query.output.idProduct)
                    .output("msj", mssql.VarChar(100))
                    .output("err", mssql.VarChar(100))
                    .execute("SP_INSERT_PRICE_PRODUCT")
                if (queryPrices.output.msj != "success") {
                    return errorResponse(400, "Validations Erros", [{ msg: queryPrices.output.err }], res)
                }
                price.inserted = true;
            }
        }

        return res.status(201).json({
            success: true,
            msg: "Product inserted",
            data: prices
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        })
    }

};
