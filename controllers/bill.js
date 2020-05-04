const sendEmail = require("../utils/sendEmail.js");
const errorResponse = require("../utils/errorResponse");

exports.sendBill = async (req, res) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "sprint"
  ) {
    let attachments;
    const message = `Está recibiendo este correo porque ha solicitado que se le envíe su factura a través de este medio.`;
    if (
      !req.files ||
      req.files.bill.name
        .substring(req.files.bill.name.length - 3)
        .toLowerCase() !== "pdf"
    ) {
      return errorResponse(
        400,
        "Bad request",
        [{ msg: "Please send a valid PDF file" }],
        res
      );
    }
    const bill = req.files.bill;

    try {
      attachments = [
        {
          filename: bill.name,
          content: Buffer.from(bill.data),
        },
      ];
    } catch (error) {
      return errorResponse(
        400,
        "Bad request",
        [
          {
            msg:
              "There was a problem processing the given file,this is probably because of an invalid file",
          },
        ],
        res
      );
    }
    try {
      await sendEmail({
        email: process.env.TEST_EMAIL,
        subject: "Solicitud de factura",
        message,
        attachments,
      });
      res.status(200).json({
        success: true,
        msg: "Email sent successfully",
      });
    } catch (error) {
      console.error(error.message);
      return errorResponse(
        500,
        "Server error",
        [{ msg: "Internal server error when trying to send email" }],
        res
      );
    }
  }
};
