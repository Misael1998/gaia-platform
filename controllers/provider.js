const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const mssql = require("mssql");

//@desc     Register new provider
//@route    POST    /api/providers
//@access   Private (Admin)

exports.newProvider = async(req, res, next) => {
    const errors = validationResult(req);
    const { role } = req.user;
    if (role === "admin") {
        if (!errors.isEmpty()) {
            return errorResponse(400, "Validations errors", errors.array(), res);
        }

        const { name, phone, email } = req.body;
        try {
            const query = await new mssql.Request()
                .input("name", mssql.VarChar(45), name)
                .input("phone", mssql.VarChar(12), phone)
                .input("email", mssql.VarChar(150), email)
                .output("msj", mssql.VarChar(50))
                .output("error", mssql.VarChar(100))
                .execute("SP_ADD_NEW_PROVIDER");

            if (query.output.msj !== "SUCCESS") {
                return errorResponse(
                    400,
                    "bad request", [{ msg: query.output.error }],
                    res
                );
            };

            return res.status(201).json({
                success: true,
                msg: "new provider registered"
            });

        } catch (err) {
            console.log(err);
            if (err.number === 515) {
                return errorResponse(
                    400,
                    "bad request", [{ msg: "cant register email" }],
                    res
                );
            }
            return errorResponse(
                500,
                "server error", [{ msg: "internal server error" }],
                res
            );
        }
    }
}