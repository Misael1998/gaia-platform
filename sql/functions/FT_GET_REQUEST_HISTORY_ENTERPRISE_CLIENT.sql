CREATE FUNCTION [dbo].[FT_GET_REQUEST_HISTORY_ENTERPRISE_CLIENT](@id int)
RETURNS TABLE
AS
RETURN
(
    SELECT r.idRequests,r.emission_date,dt.name as DeliveryType,pm.description as PaymentMethods
    FROM TBL_REQUESTS r 
    INNER JOIN TBL_DELIVERY_TYPES dt 
    ON dt.idDeliveryType=r.idDeliveryType
    INNER JOIN TBL_PAYMENT_METHODS pm 
    ON pm.idPaymentMethods=r.idPaymentMethods
    INNER JOIN TBL_ENTERPRISE_CLIENTS ec 
    ON ec.idEnterpriseClients=r.idEnterpriseClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ec.idUser
    WHERE us.idUser=@id
)


