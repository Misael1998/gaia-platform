-- Create a new stored procedure called 'SP_UPDATE_PRODUCT_PRICE' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_PRODUCT_PRICE'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_PRODUCT_PRICE
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UPDATE_PRODUCT_PRICE
    @productId INT,
    @companyType INT,
    @price FLOAT,
    @msg VARCHAR(20) OUTPUT,
    @err VARCHAR(30) OUTPUT
AS
    declare @product int = 0
    declare @company int = 0
    select @product = count(idProducts) 
        from TBL_PRODUCTS
        where idProducts = @productId

    IF @product = 0
    BEGIN
        set @msg = 'cant find product'
        set @err = 'invalid product id'
        RETURN
    END;

    select @company = count(idCompanyType)
        from TBL_COMPANY_TYPE
        where idCompanyType = @companyType

    IF @company = 0
    BEGIN
        set @msg = 'cant find company'
        set @err = 'invalid company id'
        RETURN
    END;

    IF @price < 0 OR @price = 0
    BEGIN
        set @msg = 'invalid price'
        set @err = 'price must be greater than 0'
        RETURN
    END;

    -- Update rows in table '[TableName]' in schema '[dbo]'
    UPDATE [dbo].[TBL_PRICES]
    SET
        [unit_price] = @price
    WHERE idPrices = (
        select p.idPrices from TBL_PRICES p
        INNER JOIN TBL_PRODUCT_HAS_PRICES php on php.idPrice = p.idPrices
        WHERE php.idProduct = @productId
        AND php.idCompanyType = @companyType
    )
    
    set @msg = 'success'
    set @err = 'none'
    RETURN
GO
