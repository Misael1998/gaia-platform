-- Create a new stored procedure called 'SP_UPDATE_PAYMENT' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_PAYMENT'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_PAYMENT
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UPDATE_PAYMENT
    @paymentId VARCHAR(150)
AS
    
    UPDATE [pyflor].[dbo].[BILL_HAS_STATE]
    SET
        [idState] = 2
    WHERE paymentId = @paymentId

    return 
GO