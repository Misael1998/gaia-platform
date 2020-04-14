

/* Inicio SP SP_RESET_FORGOT_PASSWORD */

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
            tokenExpire > getdate()
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

/* Fin SP SP_RESET_FORGOT_PASSWORD */


/* Inicio SP SP_SET_FORGOT_PASSWORD_TOKEN */

-- Create a new stored procedure called 'SP_SET_FORGOT_PASSWORD_TOKEN' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_SET_FORGOT_PASSWORD_TOKEN'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_SET_FORGOT_PASSWORD_TOKEN
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_SET_FORGOT_PASSWORD_TOKEN
    @token          VARCHAR(max),
    @expireDate     DATETIME,
    @idUser         INT,
    @status         VARCHAR(7) OUTPUT
AS
    INSERT INTO [pyflor].[dbo].[TBL_FORGOT_PASSWORD_TOKENS]
    VALUES
    (
     @token, @expireDate, @idUser
    )
    SET @status = 'success'
GO

/* Fin SP SP_SET_FORGOT_PASSWORD_TOKEN */


/* Inicio SP SP_ADD_CAIBILL */

-- Create a new stored procedure called 'SP_ADD_CAIBILL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_CAIBILL'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_CAIBILL
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_CAIBILL
    @idDiscounts INT,
    @idReductions INT,
    @emission_date VARCHAR(45),
    @idRequests INT,
    @num_bill  VARCHAR(100),
    @import FLOAT,
    @exent FLOAT,
    @idTaxes INT,
    @total FLOAT,
    @subTotal FLOAT,
    @msj VARCHAR(100) OUT,
    @err VARCHAR(100) OUT
AS

    DECLARE 
   @TMP_idBill INT,
   @TMP_idCAIBill INT

        IF @idRequests=' ' OR @idRequests IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Request';
            RETURN;
        END;

        IF @num_bill=' ' OR @num_bill IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Num_Bill';
            RETURN;
        END;

        IF @import=' ' OR @import IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field import';
            RETURN;
        END;

        IF @exent=' ' OR @exent IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field exent';
            RETURN;
        END;

        IF @idTaxes=' ' OR @idTaxes IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field taxes';
            RETURN;
        END;

        IF @emission_date=' ' OR @emission_date IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field emission date';
            RETURN;
        END;

        IF @subTotal=' ' OR @subTotal IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Sub total';
            RETURN;
        END;

        IF @total=' ' OR @total IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field total';
            RETURN;
        END;


    INSERT INTO TBL_BILLS(
    emission_date,
    idOrders,
    idRequests,
    num_bill
    )
    VALUES(
    @emission_date,
    null,
    @idRequests,
    @num_bill
    );
 
    SET @TMP_idBill =(
        SELECT idBills
        FROM TBL_BILLS
        WHERE @idRequests=idRequests
    )

    INSERT INTO TBL_CAI_BILL(
        idBills,
        sub_total,
        import,
        exent,
        aliquot_rate,
        total

    )
    VALUES(
        @TMP_idBill,
        @subTotal,
        @import,
        @exent,
        null,
        @total
    )

    SET @TMP_idCAIBill =(
        SELECT idCaiBills
        FROM TBL_CAI_BILL
        WHERE @TMP_idBill=idCaiBills
    )

    

    IF @idDiscounts !=NULL or @idDiscounts !=' ' BEGIN
        INSERT INTO TBL_CAI_BILL_has_TBL_DISCOUNTS
        VALUES(
            @TMP_idCAIBill,
            @idDiscounts
        )
    END;

    IF @idReductions !=NULL or @idReductions !=' ' BEGIN
        INSERT INTO TBL_CAI_BILL_has_TBL_REDUCTIONS
        VALUES(
            @TMP_idCAIBill,
            @idReductions
        )
    END;
    set @msj = 'success'
    set @err = 'none'
    RETURN 

/* Fin SP SP_ADD_CAIBILL */


/* Inicio SP SP_ADD_ORDER */

-- Create a new stored procedure called 'SP_ADD_ORDER' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_ORDER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_ORDER
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_ORDER
    @emissionDate date,
    @expiredDate date,
    @idCreatedEmployee int,
    @idProviders int,
    @idSartype int,
    @idPaymentMethods int,
    @idSenderEmployee int,
    @idReceiverEmployee int,
    @idAddressEmployee int,
    @numBill varchar(100),
    @idSupplie int,
    @quantity varchar(45),
    @unit VARCHAR(45),
	@pcMsj varchar(100) out,
    @CodeState int out /*codeState:  1=successful, 2=unsuccessfully */

AS
BEGIN
DECLARE

    @VN_value float,
    @VN_total_TEMP float,
    @VN_value_TEMP float,
    @VN_isv_TEMP float,
    @VN_count int,
    @VN_unit_price float,
    @VN_TempID_order int
    SET @pcMsj=' ';

    /*Validando si ya hay una orden en proceso*/

        IF @numBill=' ' OR @numBill IS NULL BEGIN
            SET @pcMsj='Invalid Field Provider';
            SET @CodeState=2;
            RETURN;
        END;

        SET @VN_count = (
            SELECT count(num_bill )
            FROM TBL_BILLS
            WHERE num_bill=@numBill
        )
		print (@VN_count);

    IF @VN_count>0 BEGIN

        IF @idProviders=' ' OR @idProviders IS NULL BEGIN
            SET @pcMsj='Invalid Field Provider';
            SET @CodeState=2;
            RETURN;
        END;

        SET @VN_TempID_order = (
            SELECT MAX(idOrders)
            FROM TBL_ORDERS
            WHERE(SELECT idProviders 
                FROM TBL_ORDERS ord
                INNER JOIN TBL_BILLS b ON b.idOrders=ord.idOrders
                WHERE num_bill=@numBill)=@idProviders
        )
		print (@VN_TempID_order);
        IF @VN_TempID_order=' ' OR @VN_TempID_order IS NULL BEGIN
            SET @pcMsj='NOT FOUND ';
            SET @CodeState=2;
        END;
            
        IF @idSupplie =' ' OR @idSupplie IS NULL BEGIN
            SET @pcMsj='Invalid Field Supplie';
            SET @CodeState=2;
            RETURN;
        END;

        INSERT INTO TBL_ORDER_DETAILS(
            idSupplies,
            idOrders,
            quantity,
            unit
        )
        VALUES (
            @idSupplie,
            @VN_TempID_order,
            @quantity,
            @unit
        );

        SET @VN_value = (
            SELECT value
            FROM TBL_ORDERS
            WHERE @VN_TempID_order=idOrders
        );

        SET @VN_unit_price = (
            SELECT unit_price 
            FROM TBL_SUPPLIES
            WHERE @idSupplie=idSupplies
        ); 

        SET @VN_value_TEMP =
            @VN_value + @quantity*@VN_unit_price;

        SET @VN_isv_TEMP= 0;
        SET @VN_isv_TEMP = @VN_value_TEMP*0.15;

        SET @VN_total_TEMP=0;
        SET @VN_total_TEMP = @VN_value_TEMP+@VN_isv_TEMP;

        
        UPDATE TBL_ORDERS SET 
               isv = @VN_isv_TEMP,
               value = @VN_value_TEMP,
               total = @VN_total_TEMP
        WHERE idOrders=@VN_TempID_order 
        AND idProviders=@idProviders
        SET @CodeState=1;
        SET @pcMsj = 'Successful';

        
        RETURN

    END
     
    ELSE BEGIN /*si es una nueva orden */

        IF @idProviders=' ' OR @idProviders IS NULL BEGIN
            SET @pcMsj='Invalid Field Provider';
            SET @CodeState=2;
            RETURN;
        END;
        IF @numBill=' ' OR @numBill IS NULL BEGIN
            SET @pcMsj='Invalid Field Provider';
            SET @CodeState=2;
            RETURN;
        END;
        IF @emissionDate=' ' OR @emissionDate IS NULL BEGIN
            SET @pcMsj='Invalid Field Emission Date';
            SET @CodeState=2;
            RETURN;
        END;
        IF @expiredDate=' ' OR @expiredDate IS NULL BEGIN
            SET @pcMsj='Invalid Field Expired Date ';
            SET @CodeState=2;
            RETURN;
        END;
            IF @idCreatedEmployee=' ' OR @idCreatedEmployee IS NULL BEGIN
            SET @pcMsj='Invalid Field Created Employee';
            SET @CodeState=2;
            RETURN;
        END;
        IF @idSenderEmployee=' ' OR @idSenderEmployee IS NULL BEGIN
            SET @pcMsj='Invalid Field Sender Employee';
            SET @CodeState=2;
            RETURN;
        END;
        IF @idReceiverEmployee=' ' OR @idReceiverEmployee IS NULL BEGIN
            SET @pcMsj='Invalid Field Receiver Employee';
            SET @CodeState=2;
            RETURN;
        END;
        IF @idAddressEmployee=' ' OR @idAddressEmployee IS NULL BEGIN
            SET @pcMsj='Invalid Field Address Employee';
            SET @CodeState=2;
            RETURN;
        END;
        IF @idPaymentMethods=' ' OR @idPaymentMethods IS NULL BEGIN
            SET @pcMsj='Invalid Field Payment Methods';
            SET @CodeState=2;
            RETURN;
        END;

            INSERT INTO TBL_ORDERS (
            emission_date,
            expired_date,
            idEmployees,
            idProviders,
            idSarTypes,
            idPaymentMethods,
            idSenderEmployee,
            idReceiverEmployee,
            idAddresseeEmployee,
            total,
            isv,
            value
        )
        VALUES(
            @emissionDate,
            @expiredDate,
            @idCreatedEmployee,
            @idProviders,
            @idSartype,
            @idPaymentMethods,
            @idSenderEmployee,
            @idReceiverEmployee,
            @idAddressEmployee,
            '0',
            '0',
            '0'
        );

        SET @VN_unit_price = (
            SELECT unit_price 
            FROM TBL_SUPPLIES
            WHERE @idSupplie=idSupplies
        );

        SET @VN_value_TEMP = @quantity*@VN_unit_price;

        SET @VN_isv_TEMP = @VN_value_TEMP*0.15;

        SET @VN_total_TEMP = @VN_value_TEMP+@VN_isv_TEMP;

        SET @VN_TempID_order = (
            SELECT MAX(idOrders) 
            FROM TBL_ORDERS
            WHERE idProviders=@idProviders
        )

        UPDATE TBL_ORDERS SET 
               isv = @VN_isv_TEMP,
               value = @VN_value_TEMP,
               total = @VN_total_TEMP
        WHERE  idOrders=@VN_TempID_order
        AND idProviders=@idProviders

        INSERT INTO TBL_ORDER_DETAILS(
            idSupplies,
            idOrders,
            quantity,
            unit
        )
        VALUES (
            @idSupplie,
            @VN_TempID_order,
            @quantity,
            @unit
        );

        END;   
        
        INSERT INTO TBL_BILLS(
            emission_date,
            idOrders,
            idRequests,
            num_bill
        )
        VALUES (
            @emissionDate,
            @VN_TempID_order,
            null,
            @numBill
        );

        SET @pcMsj='Successful';
        SET @CodeState=1;

        RETURN

END;  
GO  

/* Fin SP SP_ADD_ORDER */


/* Inicio SP SP_ADD_PROBILL */

  -- Create a new stored procedure called 'SP_ADD_PROBILL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_PROBILL'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_PROBILL
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_PROBILL
    @emission_date VARCHAR(45),
    @idRequests INT,
    @num_bill  VARCHAR(100),
    @description VARCHAR(45),
    @maquila decimal(10,2),
    @net_plant decimal(10,2),
    @msj VARCHAR(100) OUT,
    @err VARCHAR(100) OUT
AS

    DECLARE 
   @TMP_idBill INT

        IF @idRequests=' ' OR @idRequests IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Request';
            RETURN;
        END;

        IF @num_bill=' ' OR @num_bill IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Num_Bill';
            RETURN;
        END;

        IF @description=' ' OR @description IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field description';
            RETURN;
        END;

        IF @maquila IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field maquila';
            RETURN;
        END;

        IF  @net_plant IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field net plant';
            RETURN;
        END;

        IF @emission_date=' ' OR @emission_date IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field emission date';
            RETURN;
        END;



    INSERT INTO TBL_BILLS(
    emission_date,
    idOrders,
    idRequests,
    num_bill
    )
    VALUES(
    @emission_date,
    null,
    @idRequests,
    @num_bill
    );
 
    SET @TMP_idBill =(
        SELECT idBills
        FROM TBL_BILLS
        WHERE @idRequests=idRequests
    )
    print(@TMP_idBill);
    INSERT INTO TBL_PRO_BILL(
        idBills,
        description,
        maquila,
        net_plant

    )
    VALUES(
        @TMP_idBill,
        @description,
        @maquila,
        @net_plant
    )


    set @msj = 'success'
    set @err = 'none'
    RETURN 

/* Fin SP SP_ADD_PROBILL */


/* Inicio SP SP_ADD_USER_ENTERPRISE */

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

/* Fin SP SP_ADD_USER_ENTERPRISE */


/* Inicio SP SP_ADD_USER_INDIVIDUAL */

-- Create a new stored procedure called 'SP_ADD_USER_INDIVIDUAL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_ADD_USER_INDIVIDUAL'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_ADD_USER_INDIVIDUAL
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_ADD_USER_INDIVIDUAL(
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

    SET @VNcount = (
        SELECT count(*)
        FROM TBL_INDIVIDUAL_CLIENTS
        where register_id = @register_id
    );

    IF @VNcount> 0 BEGIN
        SET @pcMsj='Existing User';
        SET @CodeState=3;
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
        @name,
        @lastname
    );

    SET @VNid_User =(
        SELECT MAX(idUser)
        From TBL_USERS where
        @email=email
    );

    INSERT INTO TBL_INDIVIDUAL_CLIENTS(
        birth_date,
        register_id,
        idUser
    )
    VALUES (
        cast(@birth_date as date),
        @register_id,
        @VNid_User
    );

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
GO

/* Fin SP SP_ADD_USER_INDIVIDUAL */


/* Inicio SP SP_CREATE_BILL_ENTERPRISE */

-- Create a new stored procedure called 'SP_CREATE_BILL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CREATE_BILL_ENTERPRISE'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CREATE_BILL_ENTERPRISE
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CREATE_BILL_ENTERPRISE
    @requestId int,
    @userId int, 
    @urlWithToken VARCHAR(150),
    @idPayment VARCHAR(150),
    @msg varchar(20) OUTPUT,
    @err VARCHAR(20) OUTPUT
AS
    declare @hasGrass int = 0
    declare @isUserRequest int = 0
    declare @total int = 0
    declare @idBill table (id int)

    select @isUserRequest = 
        count (*)
        FROM TBL_USERS u
        INNER JOIN TBL_ENTERPRISE_CLIENTS ec
            on ec.idUser = u.idUser
        INNER JOIN TBL_REQUESTS rq
            on rq.idEnterpriseClient = ec.idEnterpriseClients
        WHERE u.idUser = @userId
        AND rq.idRequests = @requestId 

    IF @isUserRequest = 0 OR @isUserRequest IS NULL
    BEGIN
        set @msg = 'error'
        set @err = 'cant find request'
        RETURN 0
    END;

    select @hasGrass = 
        count (*)
        FROM REQUESTS_has_PRODUCTS rhp
        INNER JOIN TBL_PRODUCTS pr
            on pr.idProducts = rhp.idProducts
        INNER JOIN PRODUCTS_has_CATEGORIES phc
            on phc.idProducts = pr.idProducts
        INNER JOIN TBL_CATEGORIES c
            on c.idCategories = phc.idCategories
        WHERE c.name = 'hierba'
        AND rhp.idRequest = @requestId
    select @hasGrass

    if @hasGrass > 0
    BEGIN
        select @total = 
            sum(tbl.unit_price)
            FROM FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE(@requestId, @userId) tbl

        IF @total = 0 OR @total is NULL
        BEGIN
            set @msg = 'error'
            set @err = 'there are no products in request'
            return 0;
        END;

        INSERT INTO [pyflor].[dbo].[TBL_BILLS]
        (
            emission_date,
            idRequests,
            num_bill
        )
        OUTPUT inserted.idBills into @idBill
        VALUES
        (
            GETDATE(),
            @requestId,
            @requestId
        )
        INSERT INTO [pyflor].[dbo].[TBL_CAI_BILL]
        (
            idBills,
            sub_total,
            total
        )
        VALUES
        (
            (select id from @idBill),
            @total,
            @total
        )
        INSERT INTO [pyflor].[dbo].[BILL_HAS_STATE]
        (
            idState,
            idBill,
            date,
            urlWithToken,
            paymentId
        )
        VALUES
        (
            1,
            (select id from @idBill),
            GETDATE(),
            @urlWithToken,
            @idPayment
        )

        set @msg = 'success'
        set @err = 'none'
        return 1;
    END;

    select @total = 
        sum(tbl.unit_price)
        FROM FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE(@requestId, @userId) tbl
    
    IF @total = 0 OR @total is NULL
    BEGIN
        set @msg = 'error'
        set @err = 'there are no products in request'
        return 0;
    END;

    INSERT INTO [pyflor].[dbo].[TBL_BILLS]
    (
        emission_date,
        idRequests,
        num_bill
    )
    OUTPUT inserted.idBills into @idBill
    VALUES
    (
        GETDATE(),
        @requestId,
        @requestId
    )
    INSERT INTO [pyflor].[dbo].[TBL_PRO_BILL]
    (
        idBills,
        sub_total,
        total,
        [description]
    )
    VALUES
    (
        (select id from @idBill),
        @total,
        @total,
        'factura proforma'
    )
    INSERT INTO [pyflor].[dbo].[BILL_HAS_STATE]
    (
        idState,
        idBill,
        date,
        urlWithToken,
        paymentId
    )
    VALUES
    (
        1,
        (select id from @idBill),
        GETDATE(),
        @urlWithToken,
        @idPayment
    )

    set @msg = 'success'
    set @err = 'none'
    return 1;

GO

/* Fin SP SP_CREATE_BILL_ENTERPRISE */


/* Inicio SP SP_CREATE_BILL_INDIVIDUAL */

-- Create a new stored procedure called 'SP_CREATE_BILL' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CREATE_BILL_INDIVIDUAL'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CREATE_BILL_INDIVIDUAL
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CREATE_BILL_INDIVIDUAL
    @requestId int,
    @userId int, 
    @urlWithToken VARCHAR(150),
    @idPayment VARCHAR(150),
    @msg varchar(20) OUTPUT,
    @err VARCHAR(20) OUTPUT
AS
    declare @hasGrass int = 0
    declare @isUserRequest int = 0
    declare @total int = 0
    declare @idBill table (id int)

    select @isUserRequest = 
        count (*)
        FROM TBL_USERS u
        INNER JOIN TBL_INDIVIDUAL_CLIENTS ic
            on ic.idUser = u.idUser
        INNER JOIN TBL_REQUESTS rq
            on rq.idIndividualClient = ic.idIndividualClients
        WHERE u.idUser = @userId
        AND rq.idRequests = @requestId 

    IF @isUserRequest = 0 OR @isUserRequest IS NULL
    BEGIN
        set @msg = 'error'
        set @err = 'cant find request'
        RETURN 0
    END;

    select @hasGrass = 
        count (*)
        FROM REQUESTS_has_PRODUCTS rhp
        INNER JOIN TBL_PRODUCTS pr
            on pr.idProducts = rhp.idProducts
        INNER JOIN PRODUCTS_has_CATEGORIES phc
            on phc.idProducts = pr.idProducts
        INNER JOIN TBL_CATEGORIES c
            on c.idCategories = phc.idCategories
        WHERE c.name = 'hierba'
        AND rhp.idRequest = @requestId
    select @hasGrass

    if @hasGrass > 0
    BEGIN
        select @total = 
            sum(tbl.unit_price)
            FROM FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL(@requestId, @userId) tbl

        IF @total = 0 OR @total is NULL
        BEGIN
            set @msg = 'error'
            set @err = 'there are no products in request'
            return 0;
        END;

        INSERT INTO [pyflor].[dbo].[TBL_BILLS]
        (
            emission_date,
            idRequests,
            num_bill
        )
        OUTPUT inserted.idBills into @idBill
        VALUES
        (
            GETDATE(),
            @requestId,
            @requestId
        )
        INSERT INTO [pyflor].[dbo].[TBL_CAI_BILL]
        (
            idBills,
            sub_total,
            total
        )
        VALUES
        (
            (select id from @idBill),
            @total,
            @total
        )
        INSERT INTO [pyflor].[dbo].[BILL_HAS_STATE]
        (
            idState,
            idBill,
            date,
            urlWithToken,
            paymentId
        )
        VALUES
        (
            1,
            (select id from @idBill),
            GETDATE(),
            @urlWithToken,
            @idPayment
        )

        set @msg = 'success'
        set @err = 'none'
        return 1;
    END;

    select @total = 
        sum(tbl.unit_price)
        FROM FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL(@requestId, @userId) tbl
    
    IF @total = 0 OR @total is NULL
    BEGIN
        set @msg = 'error'
        set @err = 'there are no products in request'
        return 0;
    END;

    INSERT INTO [pyflor].[dbo].[TBL_BILLS]
    (
        emission_date,
        idRequests,
        num_bill
    )
    OUTPUT inserted.idBills into @idBill
    VALUES
    (
        GETDATE(),
        @requestId,
        @requestId
    )
    INSERT INTO [pyflor].[dbo].[TBL_PRO_BILL]
    (
        idBills,
        sub_total,
        total,
        [description]
    )
    VALUES
    (
        (select id from @idBill),
        @total,
        @total,
        'factura proforma'
    )
    INSERT INTO [pyflor].[dbo].[BILL_HAS_STATE]
    (
        idState,
        idBill,
        date,
        urlWithToken,
        paymentId
    )
    VALUES
    (
        1,
        (select id from @idBill),
        GETDATE(),
        @urlWithToken,
        @idPayment
    )

    set @msg = 'success'
    set @err = 'none'
    return 1;

GO

/* Fin SP SP_CREATE_BILL_INDIVIDUAL */


/* Inicio SP SP_CREATE_EMPLOYEE */

USE pyflor
GO
-- Create a new stored procedure called 'SP_CREATE_EMPLOYEE' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CREATE_EMPLOYEE'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CREATE_EMPLOYEE
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CREATE_EMPLOYEE
    @name VARCHAR(45),
    @lastName VARCHAR(45),
    @address VARCHAR(150),
    @phone VARCHAR(12),
    @email VARCHAR(100),
    @password VARCHAR(100),
    @jobTitle INT,
    @department INT,
    @admissionDate DATE,
    @admin INT,
    @msj VARCHAR(50) OUTPUT,
    @err VARCHAR(50) OUTPUT
AS
declare @userId TABLE (id int)
declare @adminId INT
declare @tmpJobTitle INT = 0
DECLARE @tmpDepartment INT = 0

if @jobTitle is null
    BEGIN
    set @msj = 'error'
    set @err = 'job title field cant be empty'
    return 0
END

set @tmpJobTitle = (
        select count(idJobTitle)
from [pyflor].[dbo].[TBL_JOB_TITLES]
WHERE idJobTitle = @jobTitle
    )

IF @tmpJobTitle = 0
    BEGIN
    set @msj = 'error'
    set @err = 'invalid value for job title id'
    return 0
END

if @department is null
    BEGIN
    set @msj = 'error'
    set @err = 'department field cant be empty'
    return 0
END

set @tmpDepartment = (
        select count(idDepartments)
from [pyflor].[dbo].[TBL_DEPARTMENTS]
WHERE idDepartments = @department
    )

IF @tmpDepartment = 0
    BEGIN
    set @msj = 'error'
    set @err = 'invalid value for department id'
    return 0
END

if @name is null or @name = ''
    BEGIN
    set @msj = 'error'
    set @err = 'name field cant be empty'
    return 0
END

if @address is null or @address = ''
    BEGIN
    set @msj = 'error'
    set @err = 'address field cant be empty'
    return 0
END

if @phone is null or @phone = ''
    BEGIN
    set @msj = 'error'
    set @err = 'phone field cant be empty'
    return 0
END

if @email is null or @email = ''
    BEGIN
    set @msj = 'error'
    set @err = 'email field cant be empty'
    return 0
END

if @password is null or @password = ''
    BEGIN
    set @msj = 'error'
    set @err = 'password field cant be empty'
    return 0
END

if @admin is null
    BEGIN
    set @msj = 'error'
    set @err = 'admin field cant be empty'
    return 0
END

if @admissionDate is null or @admissionDate = ''
    BEGIN
    set @msj = 'error'
    set @err = 'admission date field cant be empty'
    return 0
END

set @adminId = (
        select idAdmin
from [pyflor].[dbo].[TBL_ADMINS]
where idUser = @admin
    )

INSERT INTO [pyflor].[dbo].[TBL_USERS]
    (
    email,
    password,
    phone,
    address,
    name,
    lastname
    )
OUTPUT inserted.idUser into @userId
VALUES(
        @email,
        @password,
        @phone,
        @address,
        @name,
        @lastName 
    )

INSERT INTO [pyflor].[dbo].[TBL_EMPLOYEES]
    (
    admission_date,
    idUser,
    idDepartments,
    idJobTitle,
    idAdmin
    )
VALUES(
        @admissionDate,
        (select id
        from @userId),
        @department,
        @jobTitle,
        @adminId
    )

set @msj = 'success'
set @err = 'none'

RETURN 1
GO
-- example to execute the stored procedure we just created
-- EXECUTE dbo.SP_CREATE_EMPLOYEE 1 /*value_for_param1*/, 2 /*value_for_param2*/
-- GO

/* Fin SP SP_CREATE_EMPLOYEE */


/* Inicio SP SP_INSERT_PRODUCTS_IN_ORDER */

USE pyflor
GO

-- Create a new stored procedure called 'SP_INSERT_PRODUCTS_IN_ORDER' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_INSERT_PRODUCTS_IN_ORDER'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_INSERT_PRODUCTS_IN_ORDER
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_INSERT_PRODUCTS_IN_ORDER
    @productId int,
    @requestId int,
    @quantity int,
    @msj VARCHAR(100) OUTPUT,
    @err VARCHAR(100) OUTPUT
AS
    if @productId is null or @productId = ''
    BEGIN
        set @msj = 'falied'
        set @err = 'null or empty fields provided'
        return 0
    END;

    if @requestId is null or @requestId = ''
    BEGIN
        set @msj = 'falied'
        set @err = 'null or empty fields provided'
        return 0
    END;

    if @quantity is null or @quantity < 1
    BEGIN
        set @msj = 'falied'
        set @err = 'null or empty fields provided, or quantity cant be less than 1'
        return 0
    END;

    INSERT INTO [pyflor].[dbo].[REQUESTS_has_PRODUCTS]
    values(
        @productId,
        @requestId,
        @quantity
    )

    set @msj = 'success'
    set @err = 'none'
    return 1
GO

/* Fin SP SP_INSERT_PRODUCTS_IN_ORDER */


/* Inicio SP SP_INSERT_REQUEST */

USE pyflor
GO
-- Create a new stored procedure called 'SP_INSERT_REQUEST' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_INSERT_REQUEST'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_INSERT_REQUEST
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_INSERT_REQUEST
    @deliveryID int,
    @requestTypeID int,
    @date DATETIME,
    @shipping FLOAT,
    @payment INT,
    @clientID int,
    @msj varchar(100) OUTPUT,
    @err VARCHAR(100) OUTPUT,
    @id int OUTPUT
AS
declare @enterprise int = null
declare @individual int = null
declare @tmpId table (id int)
declare @tmpCount int
declare @uRole varchar(10) = [pyflor].[dbo].[getUserRole](@clientID)

IF @uRole = 'none'
    OR @uRole = 'employee'
    OR @uRole = 'admin'
    BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'this user cant acces this service'
    RETURN
END

IF @deliveryID is null OR @deliveryID = ''
    BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'null or empty fields provided'
    RETURN
END;

IF @requestTypeID is null OR @requestTypeID = ''
    BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'null or empty fields provided'
    RETURN
END;

IF @date is null OR @date = ''
    BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'null or empty fields provided'
    RETURN
END;

IF @uRole = 'individual'
BEGIN
    set @individual = [pyflor].[dbo].[getUserRoleID](@clientID)
END;

IF @uRole = 'enterprise'
BEGIN
    set @enterprise = [pyflor].[dbo].[getUserRoleID](@clientID)
END;

IF @individual = @enterprise
BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'something went wrong'
    RETURN
END;

select @tmpCount = count(idPaymentMethods)
FROM [pyflor].[dbo].[TBL_PAYMENT_METHODS]
WHERE idPaymentMethods = @payment

IF @tmpCount < 1
BEGIN
    set @msj = 'falied'
    set @id = null
    set @err = 'invalid payment value'
END;

INSERT INTO [pyflor].[dbo].[TBL_REQUESTS]
    (
    idDeliveryType,
    emission_date,
    shipping,
    idRequestType,
    idPaymentMethods,
    idEnterpriseClient,
    idIndividualClient
    )
OUTPUT inserted.idRequests into @tmpId
values(
        @deliveryID,
        @date,
        @shipping,
        @requestTypeID,
        @payment,
        @enterprise,
        @individual
    )

set @msj = 'success'
set @err = 'none'
set @id = (select id
from @tmpId)
RETURN 1
GO

/* Fin SP SP_INSERT_REQUEST */


/* Inicio SP SP_PAYMENT_METHOD */

-- Create a new stored procedure called 'SP_PAYMENT_METHOD' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_PAYMENT_METHOD'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_PAYMENT_METHOD
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_PAYMENT_METHOD
    @idRequest INT,
    @idPaymentMethods INT OUT,
    @err        VARCHAR(100) OUT,
    @msj        VARCHAR(100) OUT
AS
DECLARE
  @VN_idPayM INT


        

        IF @idRequest=' ' OR @idRequest IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='null or empty field Request';
            SET @idPaymentMethods=null;
            RETURN;
        END;
  
        SET @VN_idPayM= (
            SELECT idPaymentMethods FROM TBL_REQUESTS
            WHERE idRequests=@idRequest
            )

        IF @VN_idPayM =' ' OR @VN_idPayM IS NULL BEGIN
            SET @msj='FALIED'
            SET @err='VALUE NOT FOUND';
            SET @idPaymentMethods=null;
        RETURN;
        END;
     
            SET @msj='SUCCESS'
            SET @err='NONE';
            SET @idPaymentMethods=@VN_idPayM;
          
        

GO

/* Fin SP SP_PAYMENT_METHOD */


/* Inicio SP SP_UPDATE_PAYMENT */

-- Create a new stored procedure called 'SP_UPDATE_PAYMENT' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_UPDATE_PAYMENT'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_UPDATE_PAYMENT
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_UPDATE_PAYMENT
    @paymentId VARCHAR(150)
AS
    
    UPDATE [pyflor].[dbo].[BILL_HAS_STATE]
    SET
        [idState] = 2
    WHERE paymentId = @paymentId
    
    return 1
GO

/* Fin SP SP_UPDATE_PAYMENT */


/* Inicio SP */
/* Fin SP */