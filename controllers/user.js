const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mssql = require("mssql");


const app = express();

app.use(express.json());


//Función para comprobar que todos los parámetros sean recibidos.
// let checkParams = (body) => {
//   if (!body.email.trim() || !body.name.trim() || !body.password.trim() || !body.phone.trim() || !body.address.trim() ||
//     !body.company_name.trim() || !body.contact_name.trim() || !body.rtn.trim() || !body.contact_number.trim() ||
//     !body.company_type.trim() || !body.sector.trim() || !body.business_name.trim()) {
//     return false;
//   }
//   return true;
// }




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
    // name,
    password,
    phone,
    address,
    company_name,
    company_type,
    rtn,
    contact_name,
    contact_number,
    sector,
    business_name
  } = req.body;



  try {
    let allSent = (email.trim() && /*name.trim() &&*/ password.trim() && phone.trim() && address.trim() &&
      company_name.trim() && contact_name.trim() && rtn.trim() && contact_number.trim() &&
      company_type.trim() && sector.trim() && business_name.trim());


    if (!allSent) return res.status(400).send("Not all arguments have been sent");

    let query = await new mssql.Request()
      .input("email", mssql.VarChar(100), email)
      .query("select * from TBL_USERS where email = @email");

    if (!(query.recordset.length > 0)) {

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      //Esperando a Ledys para que cree el procedimiento de usuario empresarial.
      query = await new mssql.Request()
        .input("email", mssql.VarChar(100), email)
        .input("password", mssql.VarChar(100), encryptedPassword)
        .input("phone", mssql.VarChar(12), phone)
        .input("address", mssql.VarChar(150), address)
        // .input("name", mssql.VarChar(45), name)
        .input("company_name", mssql.VarChar(45), company_name)
        .input("contact_name", mssql.VarChar(45), contact_name)
        .input("rtn", mssql.VarChar(12), rtn)
        .input("contact_number", mssql.VarChar(12), contact_number)
        .input("idCompanyType", mssql.Int, company_type)
        .input("idSector", mssql.Int, sector)
        .input("business_name", mssql.NVarChar(45), business_name)
        .output("pcMsj", mssql.VarChar(45))
        .output("id_user", mssql.Int)
        .output("CodeState", mssql.Int)
        // .output("role", mssql.VarChar(mssql.MAX))
        .execute("SP_ADD_USER_ENTERPRISE")

      const {
        CodeState,
        id_user,
        // role,
        pcMsj
      } = query.output;

      //Valores de prueba
      // let CodeState = 1;
      // let pcMsj = "algo";
      //----------------------


      switch (CodeState) {
        case 0:
          return res.status(500).json({
            success: false,
            msg: pcMsj
          });
          break;
        case 1:
          let token = jwt.sign({
            id: id_user,
            role: "Enterpise"
          }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRE
          });
          return res.status(201).json({
            success: true,
            msg: pcMsj,
            token
          })
          break;
        case 2:
          return res.status(400).json({
            success: false,
            msg: pcMsj
          });
          break;
        case 3:
          return res.status(400).json({
            success: false,
            msg: pcMsj
          });
          break;
      }
      // if (status == 1) {
      //   let token = jwt.sign({
      //     //Datos del usuario que se deben mandar(payload).
      //     id: user.idUser,
      //     role: "Enterpise"
      //   }, process.env.JWT_KEY, {
      //     expiresIn: process.env.JWT_EXPIRE
      //   });
      //   return res.status(201).json({
      //     success: true,
      //     pcMsj,
      //     token
      //   })
      // } else {
      //   return res.status(500).json({
      //     success: false,
      //     pcMsj
      //   })
      // }

    } else {
      res.status(400).json({
        success: false,
        msg: "This email is already registered."
      });
    }
  } catch (e) {
    if (e == "TypeError: Cannot read property 'trim' of undefined") {
      res.status(400).json({
        success: false,
        msg: "Not all arguments have been sent"
      })
    } else {
      res.status(500).json({
        success: false,
        msg: `Looks like ${e.toString()} has occurred`
      });
    }
  }
}
