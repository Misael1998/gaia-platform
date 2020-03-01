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


//@desc     get all types of SAR 
//@route    GET     /api/data/sar_type
//@access   Private
exports.sar_type = async (req,res,next) => {
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
