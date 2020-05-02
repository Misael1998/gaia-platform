-- Create a new stored procedure called 'SP_INSERT_PRICE_PRODUCT' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_INSERT_PRICE_PRODUCT'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_INSERT_PRICE_PRODUCT
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_INSERT_PRICE_PRODUCT
    @price         FLOAT,
    @idCompanyType INT,
    @idProduct     INT,
    @err           VARCHAR(100) OUTPUT,
    @msj           VARCHAR(100) OUTPUT
AS
DECLARE @tmpIdPrices TABLE (idPrice INT)
DECLARE @idP INT,
        @count INT

    IF  @idCompanyType = ' ' OR @idCompanyType IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields company type'
    RETURN
    END;

    SET  @count =(
     SELECT COUNT(*) 
    FROM TBL_COMPANY_TYPE
    WHERE idCompanyType=@idCompanyType
    )
    IF  @count=0 BEGIN
        SET @msj ='Failed'
        SET @err= 'Company type not found' 
        SET @idProduct=null
    RETURN
    END;

    
    IF  @price = ' ' OR @price IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields price'
        SET @idProduct = null
    RETURN
    END;

    IF  @idProduct = ' ' OR @idProduct IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields product'
    RETURN
    END;
 
    INSERT INTO TBL_PRICES (
        unit_price
    )
    OUTPUT inserted.idPrices INTO @tmpIdPrices 
    VALUES(
        @price
    )

    SET @idP=(SELECT idPrice FROM @tmpIdPrices) 
   

    INSERT INTO TBL_PRODUCT_HAS_PRICES(
        idProduct,
        idPrice,
        idCompanyType
    )
    VALUES (
        @idProduct,
        @idP,
        @idCompanyType
        )


    SET @msj = 'success'
    SET @err = 'None'
    RETURN
GO