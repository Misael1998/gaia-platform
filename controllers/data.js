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

//@desc     get all supplies
//@route    GET     /api/data/products
//@access   Private
exports.supplies = async (req,res)=>{
  try {
    const query = await new mssql.Request().query("SELECT * FROM F_SUPPLIES()");
    const data = query.recordset;

    if(data.length == 0){
      return res.status(200).json({
        success: true,
        msg: "There are no supplies",
        data
      })
    }else{
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
exports.inventory = async (req,res,next) => {
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



//@desc     database all products
//@route    GET     /api/data/products
//@access   Private
exports.products = async(req, res) => {
    //console.log(req.url);
    try {
        const query = await new mssql.Request().query(
            "SELECT * FROM TBL_PRODUCTS"
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
            .query("SELECT * FROM TBL_PRODUCTS WHERE @id = idProducts")
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
