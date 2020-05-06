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
    const { userId, role } = req.user;

    if (role === "individual") {
        try {
            const query = await new mssql.Request()
                //.input("id", mssql.Int, userId)
                .query("SELECT * FROM [dbo].[FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL]();");
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

    if (role === "enterprise") {
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

//@Desc     request history every client
//@Route    GET /api/data/requesthistory
//@access   PRIVATE
exports.requestHistory = async(req, res) => {
    const { userId, role } = req.user;
    if (role === "enterprise") {
        try {
            const query = await new mssql.Request()
                .input("idUser", mssql.Int, userId)
                .query(
                    "SELECT * FROM  [dbo].[FT_GET_REQUEST_HISTORY_ENTERPRISE_CLIENT](@idUser);"
                );

            const data = query.recordset;
            if (data === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Success",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }

    if (role === "individual") {
        try {
            const query = await new mssql.Request()
                .input("idUser", mssql.Int, userId)
                .query(
                    "SELECT * FROM  [dbo].[FT_GET_REQUEST_HISTORY_INDIVIDUAL_CLIENT](@idUser);"
                );

            const data = query.recordset;
            if (data === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Success",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                msg: "Server error"
            });
        }
    }
};

//@desc     get all payment methods
//@route    GET     /api/data/payment-method
//@access   Private
exports.paymentMethod = async(req, res, next) => {
    try {
        const query = await new mssql.Request().query(
            "select idPaymentMethods ,description from TBL_PAYMENT_METHODS"
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

//@desc     data of enterprise clients
//@route    GET /api/data/dataenterprise
//@access   private
exports.dataEnterprise = async(req, res) => {
    try {
        const { role, userId } = req.user;
        const query = await new mssql.Request()
            .input("idUser", mssql.Int, userId)
            .query("SELECT * FROM FT_GET_DATA_ENTERPRISE(@idUser)");

        const data = query.recordset;

        if (data === 0) {
            return (
                res.status(404),
                json({
                    success: false,
                    msg: "Data not found"
                })
            );
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
            msg: "Server error"
        });
    }
};

//@desc     get categories
//@route    GET /api/data/categories
//@access   private
exports.categories = async(req, res) => {
    try {
        const request = await new mssql.Request().query(
            "select * from FT_GET_CATEGORIES()"
        );

        data = request.recordset;

        if (data.length === 0) {
            return errorResponse(
                404,
                "Not found", [{ msg: "No data found for categories" }],
                res
            );
        }

        return res.status(200).json({
            success: true,
            data: request.recordset
        });
    } catch (err) {
        console.log(err);
        return errorResponse(
            500,
            "server error", [{ msg: "internal server error" }],
            res
        );
    }
};

//@desc     Get data of an individual client
//@route    GET /api/data/individualUser
//@access   private
exports.getIndividualData = async(req, res) => {
    const { userId } = req.user;
    try {
        const query = await new mssql.Request()
            .input("id", mssql.Int, userId)
            .query("select * from FT_GET_INDIVIDUAL_USER_DATA(@id)");

        if (query.recordset.length == 0) {
            errorResponse(
                404,
                "No user found", [{ msg: "Theres is no user registered with this id" }],
                id
            );
        }

        const data = query.recordset[0];
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.error(error.message);
        return errorResponse(500, "Server error", [{ msg: "Server error" }], res);
    }
};

//@desc     Get all company types
//@route    GET     /api/data/companytypes
//@access   Private
exports.companyTypes = async (req,res)=>{
  try{
    const query = await new mssql.Request()
      .query("select * from FT_COMPANY_TYPES()");
    data = query.recordset;
    return res.status(200).json({
      success:true,
      msg:"Company data",
      data
    })
  }catch(e){
    console.error(e.message);
    return errorResponse(
      500,
      "Server error",
      [{msg:"Internal server error"}],
      res);
  }
}


//@desc     Get  pro bill for clients 
//@route    GET /api/data/bill/:id
//@access   Private (Employee)
exports.bill = async (req,res) => {
  const idRequests = req.params.id;
    try {
        const request = await new mssql.Request()
        .input("idRequests", mssql.Int, idRequests)
        .query("SELECT * from FT_GET_BILL(@idRequests)");
  
        const type = request.recordset[0].typeBill;
        const data = request.recordset;
    
      if (data.length === 0 || type =='none') {
        return errorResponse(
          404,
          "No data",
          [{ msg: "Cant find any data" }],
          res
        );
      }
      if (type==='P'){
      let dataReq = [
        ...new Set(
          data.map(dr => {
            return JSON.stringify({
            type:dr.typeBill,    
            numBill: dr.num_bill,
            emissionDate: dr.emission_date,
            nameClient:dr.nameClient,
            subtotal: dr.sub_total,
            total: dr.total
            });
          })
        )
      ];
  
      dataReq = JSON.parse(dataReq);
      dataReq.products= data.map(dr => {
        return {
          nameProduct: dr.nameProduct,
          quantity: dr.quantity,
          price: dr.unit_price,
          importTotal:dr.importeTotal
        };
      });
      return res.send(dataReq);
    }
    if (type==='C'){
        let dataReq = [
            ...new Set(
              data.map(dr => {
                return JSON.stringify({
                address: dr.addressClient,
                rtn:dr.rtn,
                type:dr.typeBill, 
                numBill: dr.num_bill,
                emissionDate: dr.emission_date,
                shipping: dr.shipping,
                exent:dr.exent,
                import:dr.import,
                aliquotRate:dr.aliquot_rate,
                nameClient:dr.nameClient,
                subtotal: dr.sub_total,
                total: dr.total
                });
              })
            )
          ];
          dataReq = JSON.parse(dataReq);
          dataReq.products= data.map(dr => {
            return {
              nameProduct: dr.nameProduct,
              quantity: dr.quantity,
              price: dr.unit_price,
              importTotal:dr.importeTotal
            };
          });
          return res.send(dataReq);
    }
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