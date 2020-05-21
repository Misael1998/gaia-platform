IF OBJECT_ID (N'FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL') IS NOT NULL  
    DROP FUNCTION FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL;  
GO
CREATE FUNCTION [dbo].[FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL]()
RETURNS TABLE
AS
RETURN
(
    SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription,
    c.name category, st.description sarType, price.unit_price
FROM TBL_PRODUCTS p
    INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes
    INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct
    INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType
    INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices
    INNER JOIN PRODUCTS_has_CATEGORIES phc ON p.idProducts = phc.idProducts
    INNER JOIN TBL_CATEGORIES c ON phc.idCategories = c.idCategories
WHERE ct.name = 'restaurante'
)

GO