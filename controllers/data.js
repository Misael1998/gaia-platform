const mssql = require("mssql");
const errorResponse = require("../utils/errorResponse");

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
exports.inventory = async (req, res, next) => {
  try {
    const query = await new mssql.Request().query(
      "select No_Orden,Supplie_Name,unit_price,quantity,emission_date,Receiver_Employee from f_get_supplies_inventory()"
    );

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
    const query = await new mssql.Request().query(
      "select description from tbl_sar_types"
    );

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

//@desc     get all providers
//@route    GET     /api/data/providers
//@access   Private
exports.providers = async (req, res, next) => {
  try {
    const request = await new mssql.Request().query(
      "select * from FT_PROVIDERS()"
    );

    const data = request.recordset;

    if (data.length === 0) {
      return errorResponse(
        404,
        "No data",
        [{ msg: "Cant find any data" }],
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
exports.getProvider = async (req, res, next) => {
  const id = req.params.id;
  try {
    const request = await new mssql.Request()
      .input("id", mssql.Int, id)
      .query("select * from FT_GET_PROVIDER(@id)");

    const data = request.recordset;

    if (data.length === 0) {
      return errorResponse(
        404,
        "No data",
        [{ msg: "Cant find any data" }],
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
      "sever error",
      [{ msg: "internal server error" }],
      res
    );
  }
};

//@desc     database all products
//@route    GET     /api/data/products
//@access   Private
exports.products = async (req, res) => {
  //console.log(req.url);
  try {
    const query = await new mssql.Request().query("SELECT * FROM TBL_PRODUCTS");
    const data = query.recordset;
    if (data.length == 0) {
      return res.status(200).json({
        success: true,
        msg: "There are no products",
        data
      });
    }
    return res.status(200).json({
      success: true,
      msg: "products data",
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

//@desc     database single products
//@route    GET     /api/data/products
//@access   Private
exports.individualProduct = async (req, res) => {
  /*res.send(`id: ${req.params.id}`)*/
  const idProduct = req.params.id;
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
        "address" +
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

//@desc     database all employees
//@route    GET     /api/data/employees
//@access   Private
exports.employees = async (req, res) => {
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
        "address" +
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
