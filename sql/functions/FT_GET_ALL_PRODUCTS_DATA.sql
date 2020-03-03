CREATE FUNCTION [dbo].[FT_GET_ALL_PRODUCTS_DATA]()
RETURNS TABLE
AS
RETURN
(
    SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription, 
            st.description sarType, ct.name companyType, price.unit_price 
    FROM TBL_PRODUCTS p 
    INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes 
    INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct 
    INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType 
    INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices 
)

GO