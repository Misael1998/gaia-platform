-- Create a new stored procedure called 'SP_RESET_FORGOT_PASSWORD' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_RESET_FORGOT_PASSWORD'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE [dbo].[SP_RESET_FORGOT_PASSWORD]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[SP_RESET_FORGOT_PASSWORD]
    @token          VARCHAR(max),
    @newPassword    VARCHAR(max),
    @status         VARCHAR(7) OUTPUT
AS
    declare @userId int = null
    set @status = 'null'
    set @userId = (
        select idUser
        from TBL_FORGOT_PASSWORD_TOKENS
        where (
            token = @token AND
            tokenExpire < getdate()
        )
    )

    if @userId is not NULL
    BEGIN     
        UPDATE [pyflor].[dbo].[TBL_USERS]
        SET
            [password] = @newPassword  
            
        WHERE @userId = idUser
        SET @status = 'success'
    END;
  
GO
