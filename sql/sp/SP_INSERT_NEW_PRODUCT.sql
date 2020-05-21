-- Create a new stored procedure called 'SP_INSERT_NEW_PRODUCT' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_INSERT_NEW_PRODUCT'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_INSERT_NEW_PRODUCT
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_INSERT_NEW_PRODUCT
    @userAdminId INT,
    @name           VARCHAR(45),
    @idCategory     INT,
    @idSarType      INT,
    @description    VARCHAR(200),
    @idProduct      INT OUTPUT,
    @msj            VARCHAR(100) OUTPUT,         
    @err            VARCHAR(100) OUTPUT
AS

DECLARE @count INT
DECLARE @tmpIdProduct TABLE (idProduct INT)

    IF  @userAdminId = ' ' OR @userAdminId IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields user'
        SET @idProduct = null
    RETURN
    END;

    SET @count = (
        SELECT COUNT(*) 
        FROM TBL_ADMINS
        WHERE idUser= @userAdminId
        ) 
    IF  @count=0 BEGIN
        SET @msj = 'Falied'
        SET @err = 'User without access this service'
        SET @idProduct = null
    RETURN
    END;

 
    IF  @idCategory = ' ' OR @idCategory IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields product category'
        SET @idProduct = null
    RETURN
    END;

   SET @count =(
        SELECT COUNT(*) 
        FROM TBL_CATEGORIES
        WHERE idCategories=@idCategory
     )
    IF  @count=0 BEGIN
        SET @msj ='Failed'
        SET @err= 'Category not found' 
        SET @idProduct=null
    RETURN
    END;

    IF  @idSarType = ' ' OR @idSarType IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields product SARtype'
        SET @idProduct = null
    RETURN
    END; 

    SET  @count =(
     SELECT COUNT(*) 
    FROM TBL_SAR_TYPES 
    WHERE idSarTypes=@idSarType
    )
    IF  @count=0 BEGIN
        SET @msj ='Failed'
        SET @err= 'SAR type not found' 
        SET @idProduct=null
    RETURN
    END;

    IF  @name = ' ' OR @name IS NULL BEGIN
        SET @msj = 'Falied'
        SET @err = 'Null or empty fields product name'
        SET @idProduct = null
    RETURN
    END;


    INSERT INTO TBL_PRODUCTS(
        name,
        idSarTypes,
        description,
        productImage
    )
    OUTPUT inserted.idProducts INTO @tmpIdProduct
    VALUES(
        @name,
        @idSarType,
        @description,
        null
    )

        SET @idProduct = (SELECT idProduct FROM @tmpIdProduct)

        INSERT INTO PRODUCTS_has_CATEGORIES VALUES(
            @idProduct,
            @idCategory
        )

        SET @msj = 'success'
        SET @err = 'None'
        RETURN

GO