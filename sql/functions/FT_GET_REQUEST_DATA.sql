IF OBJECT_ID (N'FT_GET_REQUEST_DATA') IS NOT NULL  
    DROP FUNCTION [FT_GET_REQUEST_DATA];  
GO
CREATE FUNCTION FT_GET_REQUEST_DATA()
 RETURNS TABLE
 AS 
 RETURN(
        SELECT r.idRequests idRequest, u.name client, dt.name deliveryType,
        pm.description paymentMethod, r.emission_date
    FROM TBL_REQUESTS r
        INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
        INNER JOIN TBL_USERS u ON ic.idUser = u.idUser
        INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
        INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
UNION
    SELECT r.idRequests idRequest, ec.company_name client, dt.name deliveryType,
        pm.description paymentMethod, r.emission_date
    FROM TBL_REQUESTS r
        INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
        INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
        INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType

)
GO

