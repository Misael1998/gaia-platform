const mssql = require("mssql");
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
                msg: "sever error"
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
            msg: "sever error"
        });
    }
};


//@desc     database all products
//@route    GET     /api/data/products
//@access   Private
exports.products = async(req, res) => {
    //console.log(req.url);
    try {
        const query = await new mssql.Request()
            .query(
                'SELECT idProducts, productName, productImage, productDescription, sarType, companyType, unit_price' +
                'FROM [dbo].[FT_GET_ALL_PRODUCTS_DATA]();'
            )
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "There are no products",
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
exports.individualProduct = async(req, res) => {
    /*res.send(`id: ${req.params.id}`)*/
    const idProduct = req.params.id
    try {
        const query = await new mssql.Request()
            .input('id', mssql.Int, idProduct)
            .query(
                'SELECT idProducts, productName, productImage, productDescription, sarType, companyType, unit_price' +
                'FROM [dbo].[FT_GET_SINGLE_PRODUCT_DATA](@id);'
            )
        const data = query.recordset;
        if (data.length == 0) {

            return res.status(200).json({
                success: true,
                msg: "There is no product with this id",
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
exports.employees = async(req, res) => {
    try {
        const query = await new mssql.Request().query(
            'SELECT e.idEmployees, u.name userName,  u.lastname, j.name jobTitle,' +
            'd.name departmentName, e.admission_date, u.email, u.phone, u.address ' +
            'FROM TBL_EMPLOYEES e ' +
            'INNER JOIN TBL_USERS u ON e.idUser = u.idUser ' +
            'INNER JOIN TBL_JOB_TITLES j ON e.idJobTitle = j.idJobTitle ' +
            'INNER JOIN TBL_DEPARTMENTS d ON e.idDepartments = d.idDepartments ' +
            'ORDER BY u.name asc'
        )
        const data = query.recordset;
        if (data.length == 0) {
            return res.status(200).json({
                success: true,
                msg: "There are no employees",
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