IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_ENTERPRISE_USER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_ENTERPRISE_USER
GO
CREATE PROCEDURE dbo.SP_UPDATE_ENTERPRISE_USER
    @id INT,
    @address NVARCHAR(100),
    @phone NVARCHAR(12),
    @email NVARCHAR(100),
    @msg NVARCHAR(100) OUTPUT,
    @code INT OUTPUT
AS
BEGIN
    DECLARE 
    @userC INT;

    set @userC = (
        select 
            COUNT(*)
        from 
            TBL_USERS
        where 
            idUser = @id
    )

    IF @userC > 0
    BEGIN
        SET @msg='';
        IF @address IS NOT NULL or @address != ' '
        BEGIN
            UPDATE TBL_USERS
            SET address = @address
            WHERE idUser = @id
            SET @msg = CONCAT(@msg,'Address,');
        END;
        IF @phone IS NOT NULL OR @phone != ' '
        BEGIN
            UPDATE TBL_USERS
            SET phone = @phone
            WHERE idUser = @id
            SET @msg= CONCAT(@msg,'Phone,');
        END;
        IF @email IS NOT NULL OR @email != ' '
        BEGIN
            UPDATE TBL_USERS
            SET email = @email
            WHERE idUser = @id
            SET @msg = CONCAT(@msg,'Email')
        END;
        IF @msg='' 
        BEGIN
            SET @msg='Nothing to update';
            SET @code=0;
        END;
        SET @msg = CONCAT(@msg,' updated');
        SET @code=1;
    END;
    ELSE
    BEGIN
        SET @msg = 'No registered user with this id';
        SET @code = 2;
    END;


    END;
GO
