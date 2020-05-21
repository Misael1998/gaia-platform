-- Create a new stored procedure called 'SP_UPDATE_PAYPAL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_PAYPAL'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_PAYPAL
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UPDATE_PAYPAL
    @requestId int,
    @urlWithToken VARCHAR(150),
    @idPayment VARCHAR(150),
    @msg VARCHAR(20) OUTPUT,
    @err VARCHAR(20) OUTPUT
-- add more stored procedure parameters here
AS
    declare @billId INT

    set @billId = (
        select idBills from TBL_BILLS
        where idRequests = @requestId
    )

    -- Update rows in table '[BILL_HAS_STATE]' in schema '[dbo]'
    UPDATE [dbo].[BILL_HAS_STATE]
    SET
        [urlWithToken] = @urlWithToken,
        [paymentId] = @idPayment
        -- Add more columns and values here
    WHERE idBill = @billId
    SET @msg = 'success'
    SET @err = 'none'
    RETURN
GO
