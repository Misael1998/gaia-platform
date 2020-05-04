-- Create a new stored procedure called 'SP_ADD_NEW_PROVIDER' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_NEW_PROVIDER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_NEW_PROVIDER
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_NEW_PROVIDER(
    @name VARCHAR(45),
    @phone VARCHAR(12),
    @email VARCHAR(150),
    @msj VARCHAR  (50) out,
    @error VARCHAR (100) out
    )
AS
BEGIN
DECLARE
    @VNcount int,
    @VProvider int;
    set @VNcount = 0;
    set @msj = ' ';
    set @error = ' ';

/* Validation of fields EMPTY when ADD provider*/

    SET @VNcount = (
        SELECT count(*)
        FROM TBL_PROVIDERS
        where email = @email
    );

    IF @VNcount> 0 BEGIN
        SET @msj = 'ERROR';
        SET @error = 'EXISTING PROVIDER';
        RETURN;
    END;

    IF @name = ' ' OR @name IS NULL BEGIN
        SET @msj ='ERROR';
        SET @error = 'EMPTY FIELD';
        RETURN;
    END;

    IF @phone = ' ' OR @phone IS NULL BEGIN
        SET @msj ='ERROR';
        SET @error = 'EMPTY FIELD';
        RETURN;
    END;

    IF @email = ' ' OR @email IS NULL BEGIN
        SET @msj = 'ERROR';
        SET @error = 'EMPTY FIELD';
        RETURN;
    END;


    INSERT INTO TBL_PROVIDERS (
        name,
        phone_contact,
        email
    )
    VALUES(
        @name,
        @phone,
        @email
    );

    SET @VProvider =(
        SELECT MAX(idProviders)
        From TBL_PROVIDERS where
        @email=email
    );
    IF @VProvider IS NULL BEGIN
        SET @msj = 'ERROR';
        SET @error = 'PROVIDER REGISTRATION ERROR';
        RETURN;
    END
    ELSE BEGIN
        SET @msj = 'SUCCESS';
        SET @error = 'NONE';
    END;
END;
GO
