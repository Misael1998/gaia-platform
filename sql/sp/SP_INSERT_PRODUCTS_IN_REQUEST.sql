-- Create a new stored procedure called 'SP_INSERT_PRODUCTS_IN_ORDER' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_INSERT_PRODUCTS_IN_ORDER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_INSERT_PRODUCTS_IN_ORDER
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_INSERT_PRODUCTS_IN_ORDER
    @productId int,
    @requestId int,
    @quantity int,
    @msj VARCHAR(100) OUTPUT,
    @err VARCHAR(100) OUTPUT
AS
if @productId is null or @productId = ''
    BEGIN
    set @msj = 'falied'
    set @err = 'null or empty fields provided'
    return 0
END;

if @requestId is null or @requestId = ''
    BEGIN
    set @msj = 'falied'
    set @err = 'null or empty fields provided'
    return 0
END;

if @quantity is null or @quantity < 1
    BEGIN
    set @msj = 'falied'
    set @err = 'null or empty fields provided, or quantity cant be less than 1'
    return 0
END;

INSERT INTO [pyflor].[dbo].[REQUESTS_has_PRODUCTS]
values(
        @productId,
        @requestId,
        @quantity
    )

set @msj = 'success'
set @err = 'none'
return 1
GO