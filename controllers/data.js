const mssql = require("mssql");
const errorResponse = require("../utils/errorResponse");

//@desc     database public data
//@route    GET     /api/data/sectors
//@access   Public
exports.sectors = async(req, res, next) => {
    try {
        const request = await new mssql.Request().query(
            "select idSector id, description sector from tbl_sectors"
        );

        const data = request.recordset;

        if (data.length === 0) {
            return res.status(500).json({
                success: false,
                msg: "server error"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "sectors data",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "server error"
        });
    }
};

//@desc     get all supplies
//@route    GET     /api/data/products
//@access   Private
exports.supplies = async(req, res) => {
    try {
        const query = await new mssql.Request().query("SELECT * FROM F_SUPPLIES()");
        const data = query.recordset;

        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "There are no supplies",
                data
            });
        } else {
            return res.status(200).json({
                success: true,
                msg: "supplies data",
                data
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
};

//@desc     get the inventory of supplies
//@route    GET     /api/data/inventory
//@access   Private
exports.inventory = async(req, res, next) => {
    try {
        const query = await new mssql.Request().query(
            "select No_Orden,Supplie_Name,unit_price,quantity,emission_date,Receiver_Employee from f_get_supplies_inventory()"
        );

        const data = query.recordset;

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Successful",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "sever error"
        });
    }
};

//@desc     get all types of SAR
//@route    GET     /api/data/sartype
//@access   Private
exports.sartype = async(req, res, next) => {
    try {
        const query = await new mssql.Request().query(
            "select idSarTypes ,description from tbl_sar_types"
        );

        const data = query.recordset;

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Successful",
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "sever error"
        });
    }
};

//@desc     database all products
//@route    GET     /api/data/products
//@access   Private
exports.products = async(req, res) => {
    const { userId, role } = req.user

    if (role === 'individual') {
        try {
            const query = await new mssql.Request()
                //.input("id", mssql.Int, userId)
                .query(
                    "SELECT * FROM [dbo].[FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL]();"
                );
            const data = query.recordset;
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found"
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
                    "SELECT * FROM [dbo].[FT_GET_ALL_PRODUCTS_DATA_ENTERPRISE](@id);"
                );
            const data = query.recordset;
            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found"
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

//@desc     database single products
//@route    GET     /api/data/products
//@access   Private
exports.individualProduct = async(req, res) => {
    /*res.send(`id: ${req.params.id}`)*/
    const idProduct = req.params.id;
    try {
        const query = await new mssql.Request()
            .input("id", mssql.Int, idProduct)
            .query(
                "SELECT idProducts, " +
                "productName, " +
                "productImage, " +
                "productDescription, " +
                "category, " +
                "sarType, " +
                "companyType, " +
                "unit_price " +
                "FROM [dbo].[FT_GET_SINGLE_PRODUCT_DATA](@id);"
            );
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "No data ",
                data
            });
        }
        return res.status(200).json({
            success: true,
            msg: "product data",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "server error"
        });
    }
};

//@desc     database all employees
//@route    GET     /api/data/employees
//@access   Private
exports.employees = async(req, res) => {
    try {
        const query = await new mssql.Request().query(
            "SELECT idEmployees, " +
            "userName, " +
            "lastname, " +
            "jobTitle, " +
            "departmentName, " +
            "admission_date, " +
            "email, " +
            "phone, " +
            "address " +
            "FROM [dbo].[FT_GET_EMPLOYEES_DATA]();"
        );
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "No data",
                data
            });
        }
        return res.status(200).json({
            success: true,
            msg: "employees data",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "server error"
        });
    }
};

//@desc     get all providers
//@route    GET     /api/data/providers
//@access   Private
exports.providers = async(req, res, next) => {
    try {
        const request = await new mssql.Request().query(
            "select * from FT_PROVIDERS()"
        );

        const data = request.recordset;

        if (data.length === 0) {
            return errorResponse(
                404,
                "No data", [{ msg: "Cant find any data" }],
                res
            );
        }

        return res.status(200).json({
            success: true,
            msg: "sectors data",
            data: data
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            msg: "sever error"
        });
    }
};

//@desc     get provider by id
//@route    GET     /api/data/providers/:id
//@access   Private
exports.getProvider = async(req, res, next) => {
    const id = req.params.id;
    try {
        const request = await new mssql.Request()
            .input("id", mssql.Int, id)
            .query("select * from FT_GET_PROVIDER(@id)");

        const data = request.recordset;

        if (data.length === 0) {
            return errorResponse(
                404,
                "No data", [{ msg: "Cant find any data" }],
                res
            );
        }

        return res.status(200).json({
            success: true,
            msg: "sectors data",
            data: data
        });
    } catch (err) {
        console.log(err.message);
        return errorResponse(
            500,
            "sever error", [{ msg: "internal server error" }],
            res
        );
    }
};

//@desc     get all refferal data
//@route    GET     /api/data/refferals
//@access   Private
exports.refferals = async(req, res) => {
    try {
        const query = await new mssql.Request().query(
            "select * FROM FT_REFFERALS()"
        );
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "No refferals data yet",
                data
            });
        }
        return res.status(200).json({
            success: true,
            msg: "Refferals data",
            data
        });
    } catch (error) {
        console.log(error);
        return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
    }
};
//@desc     get request type
//@route    GET     /api/data/request
//@access   Private
exports.getRequestType = async(req, res, next) => {
    try {
        const request = await new mssql.Request().query(
            "select * from [pyflor].[dbo].FT_GET_REQUEST_TYPE()"
        );
        const data = request.recordset;
        if (data.length === 0) {
            return errorResponse(
                404,
                "no data", [{ msg: "no data in database" }],
                res
            );
        }
        res.status(200).json({
            success: true,
            msg: "request type data",
            data
        });
    } catch (err) {
        console.log(err.message);
        if (err.number === 208) {
            return errorResponse(
                500,
                "server error", [{ msg: "database error" }],
                res
            );
        }
        errorResponse(500, "server error", [{ msg: "internal server error" }], res);
    }
};

//@desc     get delivery type
//@route    GET     /api/data/delivery
//@access   Private
exports.getDeliveryType = async(req, res, next) => {
    try {
        const request = await new mssql.Request().query(
            "select * from [pyflor].[dbo].FT_GET_DELIVERY_TYPE()"
        );
        const data = request.recordset;
        if (data.length === 0) {
            return errorResponse(
                404,
                "no data", [{ msg: "no data in database" }],
                res
            );
        }
        res.status(200).json({
            success: true,
            msg: "request type data",
            data
        });
    } catch (err) {
        console.log(err.message);
        if (err.number === 208) {
            return errorResponse(
                500,
                "server error", [{ msg: "database error" }],
                res
            );
        }
        errorResponse(500, "server error", [{ msg: "internal server error" }], res);
    }
};

//@desc     get all job titles
//@route    GET     /api/data/jobtitle
//@access   Private
exports.jobTitles = async(req, res) => {
    try {
        const query = await new mssql.Request().query(
            "select * from FT_getJobTitles()"
        );
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "no data found",
                data
            });
        }
        res.status(200).json({
            success: true,
            msg: "Job titles data",
            data
        });
    } catch (error) {
        console.log(error);
        return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
    }
};

//@desc     get all departments
//@route    GET     /api/data/departments
//@access   Private
exports.departments = async(req, res) => {
    try {
        const query = await new mssql.Request().query(
            "SELECT * from FT_GET_DEPARTMENTS()"
        );
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "no data found",
                data
            });
        }
        res.status(200).json({
            success: true,
            msg: "departments data",
            data
        });
    } catch (error) {
        console.log(error);
        return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
    }
};