-- Create a new stored procedure called 'SP_ADD_USER_ENTERPRISE' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_USER_ENTERPRISE'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_USER_ENTERPRISE
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_USER_ENTERPRISE
    @email nvarchar(100),
    @password nvarchar(100),
    @phone nvarchar(12),
    @address nvarchar(150),
    @company_name nvarchar(45),
    @contact_name nvarchar(45),
    @rtn nvarchar(12),
    @contact_number nvarchar(12),
    @idCompanyType int,
    @idSector int,
    @business_name nvarchar(45),
	@pcMsj nvarchar(100) out,
    @id_user int out,
    @CodeState int out /*codeState:  0=NO EXITOSO, 1=EXITOSO, 2=no existe valor o vacio, 3=ya existe valor */
AS
BEGIN
DECLARE
    @VNcount int,
    @VNid_User int,
    @userTMP int,
    @rtnTMP int;
    SET @VNcount = 0;
    SET @pcMsj=' ';


/* Validation of fields EMPTY when ADD user*/
/* nombreEmpr,contact_name,rtn,correo,contraseña, telefono, razon social,direccion OBLIGLATORY*/
    IF @email=' ' OR @email IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @rtn=' ' OR @rtn IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;

    set @userTMP = (
        select COUNT(*)
        from TBL_USERS
        where email = @email
    )

    IF @userTMP > 0 BEGIN
        SET @pcMsj='Email alredy registered';
        SET @CodeState=3;
        RETURN;
    END;

    set @rtnTMP = (
        select COUNT(*)
        from TBL_ENTERPRISE_CLIENTS
        where RTN = @rtn
    )

    IF @rtnTMP > 0 BEGIN
        SET @pcMsj='RTN alredy registered';
        SET @CodeState=3;
        RETURN;
    END;

    IF @contact_name=' ' OR @contact_name IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @phone =' ' OR @phone IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @password=' ' OR @password IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @address=' ' OR @address IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @company_name=' ' OR @company_name IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @business_name=' ' OR @business_name IS NULL BEGIN
        SET @pcMsj='EMPTY FIELD';
        SET @CodeState=2;
        RETURN;
    END;
    IF @pcMsj <>' ' BEGIN
        SET @pcMsj= 'Error validation of input parameters';
        SET @CodeState=0;
        RETURN;
    END;

    INSERT INTO TBL_USERS (
        email,
        password,
        phone,
        address,
        name,
        lastname
    )
    VALUES(
        @email,
        @password,
        @phone,
        @address,
        @company_name,
        null
    );

    SET @VNid_User =(SELECT MAX(idUser) From TBL_USERS where @email=email);

    INSERT INTO TBL_ENTERPRISE_CLIENTS(
        company_name,
        contact_name,
        rtn,
        contact_number,
        idUser,
        idCompanyType,
        idSector,
        business_name
    )
    VALUES (
        @company_name,
        @contact_name,
        @rtn,
        @contact_number,
        @VNid_User,
        @idCompanyType,
        @idSector,
        @business_name
    );

    IF  @VNid_User IS NULL BEGIN
        SET @pcMsj='User Registration Error';
        SET @CodeState=0;
    END
    ELSE BEGIN
        SET @pcMsj='Properly Registered User';
        SET @id_user=@VNid_User;
        SET @CodeState=1;
    END;

END;
GO
