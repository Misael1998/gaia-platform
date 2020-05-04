-- Create a new stored procedure called 'SP_UPDATE_PRODUCT' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_PRODUCT'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_PRODUCT
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UPDATE_PRODUCT
    @productId INT,
    @sarType INT,
    @description VARCHAR(200),
    @msg VARCHAR(20) OUTPUT,
    @err VARCHAR(20) OUTPUT
AS
    declare @product INT = 0
    declare @sar INT = 0
    select @product = count(idProducts) 
        FROM TBL_PRODUCTS
        where idProducts = @productId
    IF @product < 1
    BEGIN
        set @msg = 'cant find product'
        set @err = 'no product for id'
        RETURN
    END;
    IF @sarType is not NULL
    BEGIN
        select @sar = count(idSarTypes) 
            FROM TBL_SAR_TYPES
            WHERE idSarTypes = @sarType
        IF @sar < 1
        BEGIN
            set @msg = 'invalid id'
            set @err = 'invalid sarType id'
            RETURN
        END;
        -- Update rows in table '[TBL_PRODUCTS]' in schema '[dbo]'
        UPDATE [dbo].[TBL_PRODUCTS]
        SET
            [idSarTypes] = @sarType 
        WHERE idProducts = @productId
    END;
    IF @description is not NULL
    BEGIN
        -- Update rows in table '[TBL_PRODUCTS]' in schema '[dbo]'
        UPDATE [dbo].[TBL_PRODUCTS]
        SET
            [description] = @description
        WHERE idProducts = @productId
    END;
    set @msg = 'success'
    set @err = 'none'
    RETURN
GO
