const mssql = require("mssql");
const { validationResult } = require("express-validator");
const errorResponse = require("../utils/errorResponse");
const paypal = require('paypal-rest-sdk');
const express = require('express');
const app = express();


//@desc     insert cai bill into DB 
//@route    POST    /api/caibill
//@access   Private
exports.CAIbill = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return errorResponse(400, "Validation errors", error.array(), res);
    }


    const { idRequest } = req.body;

    const query = await new mssql.Request()
        .input("idRequest", mssql.Int, idRequest)
        .output("msj", mssql.VarChar(100))
        .output("err", mssql.VarChar(100))
        .output("idPaymentMethods", mssql.Int)
        .execute("SP_PAYMENT_METHOD");


    const { msj } = query.output;
    if (msj !== "SUCCESS") {
        return errorResponse(400, "Bad payment method", [{ msj: msj }], res);
    } else {
        const { idPaymentMethods } = query.output
        if (idPaymentMethods == 2) {
            //Al confirmar que es un pago mediante paypal comienza la configuración 
            paypal.configure({
                'mode': 'sandbox', //sandbox or live
                'client_id': process.env.PAYPAL_CLIENT,
                'client_secret': process.env.PAYPAL_CLIENT_SECRET
            });
            const { num_bill,total,subtotal } = req.body;
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:5000/api/caibill/successpay",
                    "cancel_url": "http://localhost:5000/api/caibill/cancelpay"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "Sub Total",
                            "sku": "001",
                            "price": subtotal,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": total

                    },
                    "description": "Factura:"+ num_bill + "PYFLOR COMPANY "
                }]
            };
           
           //Redirecciona a la ventana de paypal para realizar el pago
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                           
                        }
                    }

                }
            });

            //  Se crea ésta ruta a la cual se redirecciona automaticamente, 
            //  si se efectuo el pago correctamente y seguido se hace el INSERT
            //@desc     payment in paypal 
            //@route   GET  /api/caibill/successpay
            //@acces    Private
            
            app.get('/successpay', (req, res) => {
                const payerId = req.query.PayerID;
                const paymentId = req.query.paymentId;
                const execute_payment_json = {
                    "payer_id": payerId,
                    "transactions": [{
                        "amount": {
                            "currency": "USD",
                            "total": "2.00"
                        }
                    }]
                };
                //aqui se ejecuta la transacción como tal 
                paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                    if (error) {
                        console.log(error.response);
                        throw error;
                    } else {

                        var dataPay = JSON.stringify(payment, ['state']); // capturando el estado del pago
                        
                        var ap = {};
                        ap.state = "approved";
                        if (ap = dataPay) {
                      
                            try {

                                const { idRequest, num_bill, emission_date, idtaxes,
                                    imports, exent, total, subtotal, idDiscounts, idReductions
                                        } = req.body;
                                query = new mssql.Request()
                                    .input("idRequests", mssql.Int, idRequest)
                                    .input("num_bill", mssql.VARCHAR(100), num_bill)
                                    .input("emission_date", mssql. VARCHAR(45), emission_date)
                                    .input("idTaxes", mssql.Int, idtaxes)
                                    .input("import", mssql.Float, imports)
                                    .input("exent", mssql.Float, exent)
                                    .input("total", mssql.Float, total)
                                    .input("subTotal", mssql.Float, subtotal)
                                    .input("idDiscounts", mssql.Int, idDiscounts)
                                    .input("idReductions", mssql.Int, idReductions)
                                    .output("msj", mssql.VarChar(100))
                                    .output("err", mssql.VarChar(100))
                                    .execute("SP_ADD_CAIBILL");
                                    res.redirect('http://localhost:5000/app/products')
                         
                            } catch (error) {
                                console.log(err);
                                return errorResponse(
                                    400,
                                    "Failed",
                                    error.array(), res);
                            }

                        }else{
                            return errorResponse(
                                402,
                                "Payment Required",
                                error.array(), res);
                        }
                      

                    }
                });
            });
            //en caso que el cliente cancele el pago, se debe redireccionar res.redirect(url);
            app.get('/cancelpay', (req, res) =>  res.redirect('http://localhost:5000/app/products'));

            

        } else {
            //Otro pago que sea en linea.
            try {

                const { idRequest, num_bill, emission_date, idtaxes,
                    imports, exent, total, subtotal, idDiscounts, idReductions
                        } = req.body;
                query = new mssql.Request()
                    .input("idRequests", mssql.Int, idRequest)
                    .input("num_bill", mssql.VARCHAR(100), num_bill)
                    .input("emission_date", mssql. VARCHAR(45), emission_date)
                    .input("idTaxes", mssql.Int, idtaxes)
                    .input("import", mssql.Float, imports)
                    .input("exent", mssql.Float, exent)
                    .input("total", mssql.Float, total)
                    .input("subTotal", mssql.Float, subtotal)
                    .input("idDiscounts", mssql.Int, idDiscounts)
                    .input("idReductions", mssql.Int, idReductions)
                    .output("msj", mssql.VarChar(100))
                    .output("err", mssql.VarChar(100))
                    .execute("SP_ADD_CAIBILL");
                
            } catch (error) {
                console.log(error);
                return errorResponse(
                    400,
                    "Failed",
                    error.array(), res);
            }

        }

    }



};

