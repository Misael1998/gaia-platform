IF OBJECT_ID (N'FT_GET_PRODUCT_BY_ID') IS NOT NULL  
    DROP FUNCTION [FT_GET_PRODUCT_BY_ID];  
GO
CREATE FUNCTION [FT_GET_PRODUCT_BY_ID] (@id int)
RETURNS TABLE
AS
RETURN(
    select p.idProducts productId,
    p.name name,
    p.[description] description,
    php.idCompanyType companyId,
    cp.name companyDescription,
    ps.unit_price price,
    st.idSarTypes sarId,
    st.[description] sarType
FROM TBL_PRODUCTS p
    INNER JOIN TBL_PRODUCT_HAS_PRICES php on php.idProduct = p.idProducts
    INNER JOIN TBL_PRICES ps on ps.idPrices = php.idPrice
    INNER JOIN TBL_SAR_TYPES st on st.idSarTypes = p.idSarTypes
    INNER JOIN TBL_COMPANY_TYPE cp on cp.idCompanyType = php.idCompanyType
WHERE p.idProducts = @id
)
GO