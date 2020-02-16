const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mssql = require("mssql");


const app = express();

app.use(express.json());


let msg = "";
//Función para comprobar que todos los parámetros sean recibidos.
let checkParams = (body) => {
  if (!body.email.trim() || !body.name.trim() || !body.password.trim() || !body.phone.trim() || !body.address.trim() ||
    !body.company_name.trim() || !body.contact_name.trim() || !body.rtn.trim() || !body.contact_number.trim() ||
    !body.company_type.trim() || !body.sector.trim()) {
    return false;
  }
  return true;
}





//@desc     AUTH user
//@route    POST     /api/user/enterpriseclient
//@access   Public
exports.registerEnterpriseUser = async (req, res, next) => {
  const {
    ADMIN_PASSWORD,
    ADMIN_EMAIL
  } = process.env;
  const {
    email,
    name,
    password,
    phone,
    address,
    company_name,
    company_type,
    rtn,
    contact_name,
    contact_number,
    sector
  } = req.body;

  if (!checkParams(req.body)) return res.status(400).send("Not all arguments have been sent");


  try {


    let query = await new mssql.Request()
      .input("email", mssql.VarChar(100), email)
      .query("select * from TBL_USERS where email = @email");


    if (!(query.recordset.length > 0)) {
      // return res.status(404).json({
      //   success: false,
      //   msg: "Invalid credentials"

      const encryptedPassword = await bcrypt.hash(password, 10);

      //Esperando a Ledys para que cree el procedimiento de usuario empresarial.


      query = await new mssql.Request()
        .input("email", mssql.VarChar(100), email)
        .input("name", mssql.VarChar(45), name)
        .input("encryptedPassword", mssql.VarChar(100), encryptedPassword)
        .input("phone", mssql.VarChar(12), phone)
        .input("address", mssql.VarChar(150), address)
        .input("company_name", mssql.VarChar(45), company_name)
        .input("company_type", mssql.Int, company_type)
        .input("contact_name", mssql.VarChar(45), contact_name)
        .input("contact_number", mssql.VarChar(12), contact_number)
        .input("rtn", mssql.VarChar(14), rtn)
        .input("sector", mssql.Int, sector)
        .output("idUser", mssql.Int)
        .output("status", mssql.Int)
        .output("msg", mssql.VarChar(mssql.MAX))
        .output("role", mssql.VarChar(mssql.MAX))
        .exec("SP_REGISTER_ENTERPRISE")

      const {
        status,
        idUser,
        msg
      } = query.output;
      if (status == 1) {
        let token = jwt.sign({
          //Datos del usuario que se deben mandar(payload).
          id: /*user.idUser,*/ "id",
          role: "role"
        }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRE
        });
        return res.status(201).json({
          success: true,
          msg,
          token
        })
      } else {
        return res.status(500).json({
          success: false,
          msg
        })
      }

    } else {
      msg = "This email is already registered.";
      res.status(400).json({
        success: false,
        msg
      });
    }
  } catch (e) {
    msg = `Looks like error ${e.toString().replace("Error: ","")} has occurred`;
    res.status(500).json({
      success: false,
      msg
    });
  }

}
