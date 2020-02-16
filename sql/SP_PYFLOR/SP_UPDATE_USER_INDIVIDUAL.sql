CREATE PROCEDURE SP_UPDATE_USER_INDIVIDUAL(
    @email nvarchar(100),
    @password nvarchar(100),
    @phone nvarchar(12),
    @address nvarchar(150),
    @name nvarchar(45),
    @lastname nvarchar(45),
    @birth_date date,
    @register_id nvarchar(13),
	@msj bit out
    )
AS
BEGIN
DECLARE
    @VNcount decimal(1),
    @VNid_User decimal(1),
    @msjTemp nvarchar(25);
    set @VNcount = 0;
    set @msjTemp=' ';
	set @msj = 1;

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
            IF @birth_date=' ' OR @birth_date IS NULL BEGIN 
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
            
            INSERT INTO TBL_USERS VALUES(@email,@password,@phone,@address,@name,@lastname);
            
            SET @VNid_User =(SELECT MAX (idUser) From TBL_USERS 
            where @email=email);
                INSERT TBL_INDIVIDUAL_CLIENTS VALUES (@birth_date,@register_id,@VNid_User);
            
            SET @msjTemp='Properly Registered User';
			SET @msj=0;
            
   
END;