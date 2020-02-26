const mssql = require("mssql");


const {
  validationResult
} = require("express-validator");
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

//@desc     get supplies
//@route    GET     /api/data/supplies
//@access   Private
exports.supplies = async (req, res, next) => {
  try {
    const request = await new mssql.Request().query("SELECT * FROM TBL_SUPPLIES");
    const data = request.recordset;
    if (data.length == 0) {
      return res.status(200).json({
        success: true,
        msg: "There are no supplies.",
        data
      })
    }else{
      return res.status(200).json({
        success:true,
        msg: "supplies data",
        data
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      succes: false,
      msg: "Server error"
    });
  }
};
