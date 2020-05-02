const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const mssql = require("mssql");

//@desc     Save a new product
//@route    POST    /api/newproduct
//@access   Private (Admin)
exports.newProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(400, "Validations errors", errors.array(), res);
  }

  const { name, idCategory, idSarType, description } = req.body;
  try {
    const queryContador = await new mssql.Request().query(
      "SELECT * from getCompaniesNumber();"
    );
    if (queryContador.recordset.length != req.body.prices.length) {
      return errorResponse(
        416,
        "Validations Errors",
        [
          {
            msg: "Requested Range Not Satisfiable"
          }
        ],
        res
      );
    }
    let prices1 = req.body.prices;
    prices1.sort((a, b) => a.idCompanyType - b.idCompanyType);
    for (let i = 0; i < queryContador.recordset.length; i++) {
      if (
        queryContador.recordset[i].idCompanyType !=
        JSON.parse(req.body.prices[i].idCompanyType)
      ) {
        return errorResponse(
          404,
          "Validations Errors",
          [
            {
              msg: "Not Found"
            }
          ],
          res
        );
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }

  let prices = req.body.prices.map(price => {
    if (price.price === 0 || price.price < 0) {
      return errorResponse(
        400,
        "Validations errors",
        [
          {
            msg: "Product price can't be 0 or negative"
          }
        ],
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
  const transaction = new mssql.Transaction();
  try {
    const { userId } = req.user;
    await transaction.begin();
    const query = await new mssql.Request(transaction)
      .input("userAdminId", mssql.Int, userId)
      .input("name", mssql.VarChar(45), name)
      .input("idCategory", mssql.Int, idCategory)
      .input("idSarType", mssql.Int, idSarType)
      .input("description", mssql.VarChar(200), description)
      .output("idProduct", mssql.Int)
      .output("msj", mssql.VarChar(100))
      .output("err", mssql.VarChar(100))
      .execute("SP_INSERT_NEW_PRODUCT");

    if (query.output.msj != "success") {
      await transaction.rollback();
      return errorResponse(
        400,
        "Product not inserted",
        [{ msj: query.output.err }],
        res
      );
    }

    for (let price of prices) {
      if (!price.inserted) {
        const queryPrices = await new mssql.Request(transaction)
          .input("price", mssql.Float, price.price)
          .input("idCompanyType", mssql.Int, price.idCompanyType)
          .input("idProduct", mssql.Int, query.output.idProduct)
          .output("err", mssql.VarChar(100))
          .output("msj", mssql.VarChar(100))
          .execute("SP_INSERT_PRICE_PRODUCT");
        if (queryPrices.output.msj != "success") {
          await transaction.rollback();
          return errorResponse(
            400,
            "Validations Errors",
            [{ msg: queryPrices.output.err }],
            res
          );
        }

        price.inserted = true;
      }
    }
    await transaction.commit();
    return res.status(201).json({
      success: true,
      msg: "Product inserted",
      data: prices
    });
  } catch (err) {
    transaction.rollback(e => console.log(e));
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};

//@desc     Get products details
//@route    GET    /api/product/:id
//@access   Private (Admin, Employee)
exports.getProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    request = await new mssql.Request()
      .input("id", mssql.Int, id)
      .query("select * from FT_GET_PRODUCT_BY_ID(@id)");

    const data = request.recordset;
    if (data.length === 0) {
      return errorResponse(
        400,
        "Product not found",
        [{ err: "no record for prodruct" }],
        res
      );
    }

    let product = [
      ...new Set(
        data.map(pr => {
          return JSON.stringify({
            productId: pr.productId,
            name: pr.name,
            description: pr.description,
            sarId: pr.sarId,
            sarType: pr.sarType
          });
        })
      )
    ];

    product = JSON.parse(product);
    product.prices = data.map(pr => {
      return {
        companyId: pr.companyId,
        companyDescription: pr.companyDescription,
        price: pr.price
      };
    });
    return res.send(product);
  } catch (err) {
    console.log(err);
    return errorResponse(
      500,
      "server error",
      [{ err: "internal server error" }],
      res
    );
  }
};
