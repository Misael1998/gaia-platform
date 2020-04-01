IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_INDIVIDUAL_USER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_INDIVIDUAL_USER
GO

CREATE PROCEDURE dbo.SP_UPDATE_INDIVIDUAL_USER
    @id INT,
    @address NVARCHAR(100),
    @phone NVARCHAR(12),
    @email NVARCHAR(100),
    @code INT OUTPUT /* 0:No user with this id,1:User found but not individual, 2:No fields updated,3:Successfull,4 email occupied */ 

AS
BEGIN
    DECLARE 
    @userC INT;
    DECLARE
    @clientC INT;
    DECLARE
    @updateC INT = 0;
    DECLARE
    @emailC INT = 0;
    
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
        TBL_INDIVIDUAL_CLIENTS
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

    -- If client is not individual
    IF @clientC = 0
    BEGIN
        SET @code = 1;
        RETURN 0;
    END;

    -- Updating address
    IF @address IS NOT NULL or @address != ' '
    BEGIN
        UPDATE TBL_USERS
        SET [address] = @address
        WHERE idUser = @id
        SET @updateC = @updateC + 1;
    END;
    -- Updating phone
    IF @phone IS NOT NULL OR @phone != ' '
        BEGIN
        UPDATE TBL_USERS
        SET phone = @phone
        WHERE idUser = @id
        SET @updateC = @updateC + 1;
    END;
    -- Updating email
    IF @email IS NOT NULL OR @email != ' '
        BEGIN
        UPDATE TBL_USERS
        SET email = @email
        WHERE idUser = @id
        SET @updateC = @updateC + 1;
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
