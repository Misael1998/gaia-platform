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

//@desc     get all providers
//@route    GET     /api/data/providers
//@access   Private
exports.providers = async (req, res, next) => {
  try {
    const request = await new mssql.Request().query(
      "select idProviders id, name providers from tbl_providers"
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
