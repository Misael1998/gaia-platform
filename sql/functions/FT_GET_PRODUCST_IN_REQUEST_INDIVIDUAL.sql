IF OBJECT_ID (N'FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL;  
GO  
CREATE FUNCTION FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL (@requestId int, @user int)  
RETURNS TABLE  
AS
RETURN (
    select  pr.name, pr.description, rhp.quantity, ps.unit_price price
    FROM REQUESTS_has_PRODUCTS rhp
    INNER JOIN TBL_PRODUCTS pr
        on pr.idProducts = rhp.idProducts
    INNER JOIN PRODUCTS_has_CATEGORIES phc
        on phc.idProducts = pr.idProducts
    INNER JOIN TBL_CATEGORIES c
        on c.idCategories = phc.idCategories
    INNER JOIN TBL_PRODUCT_HAS_PRICES php
        on php.idProduct = pr.idProducts
    INNER JOIN TBL_PRICES ps
        on ps.idPrices = php.idPrice
    INNER JOIN TBL_COMPANY_TYPE ct
        on ct.idCompanyType = php.idCompanyType
    INNER JOIN TBL_REQUESTS rq
        on rq.idRequests = rhp.idRequest
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic
        on ic.idIndividualClients = rq.idIndividualClient
    and ic.idUser = @user
    and ct.name = 'restaurante'
)
GO
