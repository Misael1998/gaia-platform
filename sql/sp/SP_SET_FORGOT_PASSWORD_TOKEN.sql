-- Create a new stored procedure called 'SP_SET_FORGOT_PASSWORD_TOKEN' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_SET_FORGOT_PASSWORD_TOKEN'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_SET_FORGOT_PASSWORD_TOKEN
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_SET_FORGOT_PASSWORD_TOKEN
    @token          VARCHAR(max),
    @expireDate     DATETIME,
    @idUser         INT,
    @status         VARCHAR(7) OUTPUT
AS
declare @fecha datetime = dateadd(hh, 2, getdate())
INSERT INTO [pyflor].[dbo].[TBL_FORGOT_PASSWORD_TOKENS]
VALUES
    (
        @token, @fecha, @idUser
    )
SET @status = 'success'
GO
