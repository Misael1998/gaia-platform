IF OBJECT_ID (N'FT_GET_PRODUCTS_ADMIN') IS NOT NULL  
    DROP FUNCTION FT_GET_PRODUCTS_ADMIN;  
GO
CREATE FUNCTION [dbo].[FT_GET_PRODUCTS_ADMIN]()
RETURNS TABLE
AS
RETURN
(
    select p.idProducts idProducts, p.name productName, p.description description,
    pr.unit_price unitPrice, c.name category, st.description sarType,
    p.productImage productImage, ct.name company
from TBL_PRODUCTS p
    inner join TBL_PRODUCT_HAS_PRICES php on p.idProducts=php.idProduct
    inner join TBL_COMPANY_TYPE ct on ct.idCompanyType=php.idCompanyType
    inner join TBL_PRICES pr on pr.idPrices = php.idPrice
    inner join PRODUCTS_has_CATEGORIES phc on phc.idProducts=p.idProducts
    inner join TBL_CATEGORIES c on c.idCategories = phc.idCategories
    inner join TBL_SAR_TYPES st on st.idSarTypes=p.idSarTypes
)

GO