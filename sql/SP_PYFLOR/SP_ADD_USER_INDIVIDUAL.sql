CREATE PROCEDURE SP_ADD_USER_INDIVIDUAL(
    @email nvarchar(100),
    @password nvarchar(100),
    @phone nvarchar(12),
    @address nvarchar(150),
    @name nvarchar(45),
    @lastname nvarchar(45),
    @birth_date varchar(45),
    @register_id nvarchar(13),
    @pcMsj nvarchar(100) out,
    @id_user int out,
    @CodeState int out /*codeState:  0=NO EXITOSO, 1=EXITOSO, 2=no existe valor o vacio, 3=ya existe valor */
    )
AS
BEGIN
DECLARE
    @VNcount int,
    @VNid_User int;
    set @VNcount = 0;
    set @pcMsj=' ';

/* Validation of fields EMPTY when ADD user*/

            IF @name='  ' OR @name IS NULL BEGIN 
                SET @pcMsj='EMPTY FIELD';
                SET @CodeState=2;
                
                RETURN;   
            END;  
            IF @lastname=' ' OR @lastname IS NULL BEGIN
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
                set @pcMsj='EMPTY FIELD';
                SET @CodeState=2;
                RETURN;
            END;
            IF @address=' ' OR @address IS NULL BEGIN 
                set @pcMsj='EMPTY FIELD';
                SET @CodeState=2;
                RETURN;
            END;
           
            IF @register_id=' ' OR @register_id IS NULL BEGIN 
                set @pcMsj='EMPTY FIELD';
                SET @CodeState=2;
                RETURN;
            END;

            SET @VNcount = (SELECT count(*)  FROM TBL_INDIVIDUAL_CLIENTS
            where register_id=@register_id);
            IF @VNcount>0 BEGIN
                SET @pcMsj='Existing User';
                SET @CodeState=3;
                RETURN;
            END;
            
            INSERT INTO TBL_USERS (email,password,phone,address,name,lastname,resetPasswordToken,resetPasswordExpire)
            VALUES(@email,@password,@phone,@address,@name,@lastname,'s',null);
            
            SET @VNid_User =(SELECT MAX(idUser) From TBL_USERS where @email=email );
            INSERT INTO TBL_INDIVIDUAL_CLIENTS(birth_date,register_id,idUser) 
            VALUES (cast(@birth_date as date),@register_id,@VNid_User);
            
             IF  @VNid_User IS NULL BEGIN
                SET @pcMsj='User Registration Error';
                SET @CodeState=0;
                RETURN;
            END
            ELSE BEGIN 
                SET @pcMsj='Properly Registered User';
                SET @id_user=@VNid_User;
                SET @CodeState=1;
            END;
END;


/*drop procedure SP_ADD_USER_INDIVIDUAL

exec SP_ADD_USER_INDIVIDUAL 'estef@.com','pajaritos','658',' colonia','ledys','santos','2018-02-02','0801','bien','1';

delete from TBL_USERS where idUser=15;
delete from TBL_INDIVIDUAL_CLIENTS where idUser=15;

select * from TBL_INDIVIDUAL_CLIENTS

select * from TBL_USERS*/