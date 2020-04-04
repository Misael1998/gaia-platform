-- Create a new stored procedure called 'SP_PAYMENT_METHOD' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_PAYMENT_METHOD'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_PAYMENT_METHOD
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_PAYMENT_METHOD
    @idRequest INT,
    @idPaymentMethods INT OUT,
    @err        VARCHAR(100) OUT,
    @msj        VARCHAR(100) OUT
AS
DECLARE
  @VN_idPayM INT


        

        IF @idRequest=' ' OR @idRequest IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Request';
            SET @idPaymentMethods=null;
            RETURN;
        END;
  
        SET @VN_idPayM= (
            SELECT idPaymentMethods FROM TBL_REQUESTS
            WHERE idRequests=@idRequest
            )

        IF @VN_idPayM =' ' OR @VN_idPayM IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='VALUE NOT FOUND';
            SET @idPaymentMethods=null;
        RETURN;
        END;
     
            SET @msj='SUCCESS'
            SET @err='NONE';
            SET @idPaymentMethods=@VN_idPayM;
          
        

GO


--EXECUTE dbo.SP_PAYMENT_METHOD 2,1,'1','1'