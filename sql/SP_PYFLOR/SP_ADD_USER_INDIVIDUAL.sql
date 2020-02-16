CREATE PROCEDURE SP_ADD_USER_INDIVIDUAL(
    @email nvarchar(100),
    @password nvarchar(100),
    @phone nvarchar(12),
    @address nvarchar(150),
    @name nvarchar(45),
    @lastname nvarchar(45),
    @birth_date varchar(45),
    @register_id nvarchar(13),
	@msjTemp nvarchar(100) out,
    @id_user int out
    )
AS
BEGIN
DECLARE
    @VNcount int,
    @VNid_User int;
    set @VNcount = 0;
    set @msjTemp=' ';

/* Validation of fields EMPTY when ADD user*/

            IF @name='  ' OR @name IS NULL BEGIN 
                SET @msjTemp='EMPTY FIELD';
                RETURN;   
            END;  
            IF @lastname=' ' OR @lastname IS NULL BEGIN
                SET @msjTemp='EMPTY FIELD';
                RETURN;     
            END;               
            IF @phone =' ' OR @phone IS NULL BEGIN
                SET @msjTemp='EMPTY FIELD';
                RETURN;
            END;
            IF @email=' ' OR @email IS NULL BEGIN
                SET @msjTemp='EMPTY FIELD';
                RETURN;     
            END;         
            IF @password=' ' OR @password IS NULL BEGIN 
                set @msjTemp='EMPTY FIELD';
                RETURN;
            END;
            IF @address=' ' OR @address IS NULL BEGIN 
                set @msjTemp='EMPTY FIELD';
                RETURN;
            END;
           
            IF @register_id=' ' OR @register_id IS NULL BEGIN 
                set @msjTemp='EMPTY FIELD';
                RETURN;
            END;

            SET @VNcount = (SELECT count(*)  FROM TBL_INDIVIDUAL_CLIENTS
            where register_id=@register_id);
            IF @VNcount>0 BEGIN
                set @msjTemp='Existing User';
                RETURN;
            END;
            
            INSERT INTO TBL_USERS (email,password,phone,address,name,lastname,resetPasswordToken,resetPasswordExpire)
            VALUES(@email,@password,@phone,@address,@name,@lastname,'s',null);
            
            SET @VNid_User =(SELECT MAX(idUser) From TBL_USERS where @email=email );
            INSERT INTO TBL_INDIVIDUAL_CLIENTS(birth_date,register_id,idUser) 
            VALUES (cast(@birth_date as date),@register_id,@VNid_User);
            
            SET @msjTemp='Properly Registered User';
            set @id_user=@VNid_User;

END;

drop procedure SP_ADD_USER_INDIVIDUAL

exec SP_ADD_USER_INDIVIDUAL 'estef@.com','pajaritos','658',' colonia','ledys','santos','2018-02-02','0801','bien','1';

delete from TBL_USERS where idUser=15;
delete from TBL_INDIVIDUAL_CLIENTS where idUser=15;

select * from TBL_INDIVIDUAL_CLIENTS

select * from TBL_USERS


