CREATE PROCEDURE SP_ADD_USER_ENTERPRISE(
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
    )       
AS
BEGIN
DECLARE
    @VNcount int,
    @VNid_User int;
    SET @VNcount = 0;
    SET @pcMsj=' ';
   

/* Validation of fields EMPTY when ADD user*/
/* nombreEmpr,contact_name,rtn,correo,contraseña, telefono, razon social,direccion OBLIGLATORY*/
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
            IF @email=' ' OR @email IS NULL BEGIN
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

            IF @rtn=' ' OR @rtn IS NULL BEGIN 
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

            SET @VNcount = (SELECT count(*)  FROM TBL_ENTERPRISE_CLIENTS 
            where rtn=@rtn)
            IF @VNcount>0 BEGIN
                SET @pcMsj='Existing User';
                SET @CodeState=3;
                RETURN;
            END;

     
            INSERT INTO TBL_USERS (email,password,phone,address,name,lastname,resetPasswordToken,resetPasswordExpire)
            VALUES(@email,@password,@phone,@address,@company_name,null,null,null);
            
            SET @VNid_User =(SELECT MAX(idUser) From TBL_USERS where @email=email);

            INSERT INTO TBL_ENTERPRISE_CLIENTS(company_name ,contact_name,rtn,contact_number,idUser,idCompanyType,idSector,business_name) 
            VALUES (@company_name,@contact_name,@rtn,@contact_number,@VNid_User,@idCompanyType,@idSector,@business_name);
            
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


/*drop procedure SP_ADD_USER_ENTERPRISE

exec SP_ADD_USER_ENTERPRISE 'juan@com', 'pajarito2','9821','col','pizza','hut','PIZZAHUT','juanLopez','0122','9888','1','1','cualq','bien','8';

delete from TBL_COMPANY_TYPE where idCompanyType=3;

select * from TBL_USERS;


select * from TBL_INDIVIDUAL_CLIENTS

select * from TBL_SECTORS
   
insert into TBL_COMPANY_TYPE values ('hoteles');
insert into TBL_COMPANY_TYPE values ('restaurante');

insert into TBL_SECTORS VALUES ('gourmet');
insert into TBL_SECTORS VALUES ('vinos');*/