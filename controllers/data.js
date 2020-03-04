const mssql = require("mssql");
//@desc     database public data
//@route    GET     /api/data/sectors
//@access   Public
exports.sectors = async (req, res, next) => {
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
exports.supplies = async (req, res) => {
    try {
        const query = await new mssql.Request().query("SELECT * FROM F_SUPPLIES()");
        const data = query.recordset;

        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "There are no supplies",
                data
            })
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
exports.inventory = async (req, res, next) => {
    try {
        const query = await new mssql.Request()
            .query("select No_Orden,Supplie_Name,unit_price,quantity,emission_date,Receiver_Employee from f_get_supplies_inventory()");

        const data = query.recordset;

        if (data.length === 0) {
            return res.status(500).json({
                success: false,
                msg: "Inventory empty"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "inventory data",
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
//@route    GET     /api/data/sar_type
//@access   Private
exports.sar_type = async (req, res, next) => {
    try {
        const query = await new mssql.Request()
            .query("select description from tbl_sar_types");

        const data = query.recordset;

        if (data.length === 0) {
            return res.status(500).json({
                success: false,
                msg: "sar_type empty"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "sar_type data",
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
exports.products = async (req, res) => {
    //console.log(req.url);


    try {
        const query = await new mssql.Request()
            .query(
                'SELECT idProducts, ' +
                'productName, ' +
                'productImage, ' +
                'productDescription, ' +
                'category, ' +
                'sarType, ' +
                'companyType, ' +
                'unit_price ' +
                'FROM [dbo].[FT_GET_ALL_PRODUCTS_DATA]();'
            )
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "No data",
                data
            })
        }
        return res.status(200).json({
            success: true,
            msg: "products data",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "server error"
        })

    }
}


//@desc     database single products
//@route    GET     /api/data/products
//@access   Private
exports.individualProduct = async (req, res) => {
    /*res.send(`id: ${req.params.id}`)*/
    const idProduct = req.params.id
    try {
        const query = await new mssql.Request()
            .input('id', mssql.Int, idProduct)
            .query(
                'SELECT idProducts, ' +
                'productName, ' +
                'productImage, ' +
                'productDescription, ' +
                'category, ' +
                'sarType, ' +
                'companyType, ' +
                'unit_price ' +
                'FROM [dbo].[FT_GET_SINGLE_PRODUCT_DATA](@id);'
            )
        const data = query.recordset;
        if (data.length == 0) {

            return res.status(200).json({
                success: true,
                msg: "No data ",
                data
            })
        }
        return res.status(200).json({
            success: true,
            msg: "product data",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "server error"
        })

    }
}

//@desc     database all employees
//@route    GET     /api/data/employees
//@access   Private
exports.employees = async (req, res) => {
    try {
        const query = await new mssql.Request().query(
            'SELECT idEmployees, ' +
            'userName, ' +
            'lastname, ' +
            'jobTitle, ' +
            'departmentName, ' +
            'admission_date, ' +
            'email, ' +
            'phone, ' +
            'address' +
            'FROM [dbo].[FT_GET_EMPLOYEES_DATA]();'
        )
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "No data",
                data
            })
        }
        return res.status(200).json({
            success: true,
            msg: "employees data",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "server error"
        })

    }
}