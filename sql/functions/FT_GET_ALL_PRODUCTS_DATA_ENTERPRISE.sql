IF OBJECT_ID (N'FT_GET_ALL_PRODUCTS_DATA_ENTERPRISE', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_ALL_PRODUCTS_DATA_ENTERPRISE;  
GO
CREATE FUNCTION [dbo].[FT_GET_ALL_PRODUCTS_DATA_ENTERPRISE](@id INT)
RETURNS @allProductsData TABLE(
    idProduct INT NULL,
    productName VARCHAR(45) NULL,
    productImage IMAGE NULL,
    productDescription VARCHAR(200) NULL,
    category VARCHAR(45) NULL,
    sarType VARCHAR(45) NULL,
    companyType VARCHAR(45),
    unitPrice FLOAT NULL
)
AS
BEGIN

    DECLARE @company VARCHAR(45) = '';

    SELECT @company = ct.name
    FROM TBL_ENTERPRISE_CLIENTS ec
        INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
        INNER JOIN TBL_COMPANY_TYPE ct ON ec.idCompanyType = ct.idCompanyType
    WHERE u.idUser = @id;

    BEGIN
        INSERT INTO @allProductsData
        SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription,
            c.name category, st.description sarType, ct.name companyType, price.unit_price
        FROM TBL_PRODUCTS p
            INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes
            INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct
            INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType
            INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices
            INNER JOIN PRODUCTS_has_CATEGORIES phc ON p.idProducts = phc.idProducts
            INNER JOIN TBL_CATEGORIES c ON phc.idCategories = c.idCategories
        WHERE ct.name = @company;
    END
    RETURN
END
GO
