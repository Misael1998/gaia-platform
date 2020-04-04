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
    @address VARCHAR(100),
    @phone VARCHAR(12),
    @email VARCHAR(100),
    @contact_name VARCHAR(45),
    @contact_number VARCHAR(12),
    @code INT OUTPUT
/* 0:No user with this id,1:User found but not enterprise, 2:No fields updated,3:Successfull */

AS
BEGIN
    DECLARE 
    @userC INT;
    DECLARE
    @clientC INT;
    DECLARE
    @updateC INT = 0;
    DECLARE
    @emailC INT;
    DECLARE
    @repeated INT;

    -- Getting count of users with input id
    set @userC = (
    select
        COUNT(*)
    from
        TBL_USERS
    where 
        idUser = @id
    )
    -- Getting count of users with this email
    set @emailC = (
    select
        COUNT(*)
    from
        TBL_USERS
    where 
        email = @email AND idUser!=@id
    )
    -- Getting count of clients linked with user id
    SET @clientC = (
    select
        COUNT(*)
    from
        TBL_ENTERPRISE_CLIENTS
    where 
        idUser = @id
    )
    -- If there is no user registered with input id
    IF @userC=0
    BEGIN
        SET @code = 0;
        RETURN 0;
    END;
    -- If there is a user registered with input email
    IF @emailC>0
    BEGIN
        SET @code = 4;
        RETURN 0;
    END;

    -- If client is not enterprise
    IF @clientC = 0
    BEGIN
        SET @code = 1;
        RETURN 0;
    END;

    -- Updating address
    IF @address IS NOT NULL or @address != ' '
    BEGIN
        SET @repeated = (select
            COUNT(*)
        from
            TBL_USERS
        where 
            idUser = @id and [address]=@address
        )

        IF @repeated = 0
        BEGIN
            UPDATE TBL_USERS
            SET [address] = @address
            WHERE idUser = @id
            SET @updateC = @updateC + 1;
        END;
    END;
    -- Updating phone
    IF @phone IS NOT NULL OR @phone != ' '
    BEGIN
        SET @repeated = (select
            COUNT(*)
        from
            TBL_USERS
        where 
            idUser = @id and phone=@phone
        )
        IF @repeated = 0
        BEGIN
            UPDATE TBL_USERS
                SET phone = @phone
                WHERE idUser = @id
            SET @updateC = @updateC + 1;
        END;
    END;
    -- Updating email
    IF @email IS NOT NULL OR @email != ' '    
    BEGIN
        SET @repeated = (select
            COUNT(*)
        from
            TBL_USERS
        where 
            idUser = @id and email=@email
        )
        IF @repeated = 0
            BEGIN
            UPDATE TBL_USERS
            SET email = @email
            WHERE idUser = @id
            SET @updateC = @updateC + 1;
        END;
    END;
    -- Updating contact name
    IF @contact_name IS NOT NULL OR @contact_name != ' '
    BEGIN
        SET @repeated = (select
            COUNT(*)
        from
            TBL_ENTERPRISE_CLIENTS
        where 
            idUser = @id and contact_name=@contact_name
        )
        IF @repeated = 0
        BEGIN
            UPDATE TBL_ENTERPRISE_CLIENTS
            SET contact_name = @contact_name
            WHERE idUser = @id
            SET @updateC = @updateC + 1;
        END;
    END;
    -- Updating contact number
    IF @contact_number IS NOT NULL OR @contact_number != ' '
    BEGIN
        SET @repeated = (select
            COUNT(*)
        from
            TBL_ENTERPRISE_CLIENTS
        where 
            idUser = @id and contact_number=@contact_number
        )
        IF @repeated = 0
        BEGIN
            UPDATE TBL_ENTERPRISE_CLIENTS
            SET contact_number = @contact_number
            WHERE idUser = @id
            SET @updateC = @updateC + 1;
        END;
    END;
    -- If no changes were made
    IF @updateC = 0
    BEGIN
        SET @code = 2;
        RETURN 0;
    END;

    SET @code=3;



END;
GO
