IF OBJECT_ID (N'FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE;  
GO  
CREATE FUNCTION FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE (@requestId int, @user int)  
RETURNS TABLE  
AS
RETURN (
    select  pr.name, pr.description, rhp.quantity, ps.unit_price price
    FROM REQUESTS_has_PRODUCTS rhp
    INNER JOIN TBL_PRODUCTS pr
        on pr.idProducts = rhp.idProducts
    INNER JOIN TBL_PRODUCT_HAS_PRICES php
        on php.idProduct = pr.idProducts
    INNER JOIN TBL_PRICES ps
        on ps.idPrices = php.idPrice
    INNER JOIN TBL_COMPANY_TYPE ct
        on ct.idCompanyType = php.idCompanyType
    WHERE rhp.idRequest = @requestId
    and ct.idCompanyType =  
    (
        select ecs.idCompanyType
        from TBL_ENTERPRISE_CLIENTS ecs
        INNER JOIN TBL_COMPANY_TYPE cts
            ON ecs.idCompanyType = cts.idCompanyType
        INNER JOIN TBL_REQUESTS rq
            ON rq.idEnterpriseClient = ecs.idEnterpriseClients
        WHERE rq.idRequests = @requestId
        AND ecs.idUser = @user
    )
)
GO
