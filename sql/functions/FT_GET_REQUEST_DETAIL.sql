CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL]()
RETURNS TABLE
AS
RETURN
(
    SELECT r.idRequests, 
        r.emission_date, 
        dt.name deliveryType, 
        pm.description paymentMethod, 
        p.name product,
        rhp.quantity,  
        cb.sub_total
    FROM TBL_REQUESTS r 
    INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
    INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
    INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
    INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct
    INNER JOIN TBL_PRICES pr ON pr.idPrices = php.idPrice
    INNER JOIN REQUESTS_has_PRODUCTS rhp ON rph.idProducts = p.idProducts
    INNER JOIN TBL_BILLS b ON r.idRequests = b.idRequests
    INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills
    WHERE r.idRequests = rph.idRequest
)

GO