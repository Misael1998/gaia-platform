IF OBJECT_ID (N'dbo.getUserRoleID', N'FN') IS NOT NULL  
    DROP FUNCTION getUserRoleID;  
GO
CREATE FUNCTION [dbo].[getUserRoleID](@userId int)  
RETURNS INT
AS   
-- Returns the user role  
BEGIN
    declare @employeeId int = null;
    declare @enterpriseId int = null;
    declare @individualId int = null;
    declare @adminId int = null;

    set @employeeId = (
        select idEmployees
    from TBL_EMPLOYEES
    where idUser = @userId
    )
    if(@employeeId is not null )
        return @employeeId;

    set @enterpriseId = (
        select idEnterpriseClients
    from TBL_ENTERPRISE_CLIENTS
    where idUser = @userId
    )
    if(@enterpriseId is not null )
        return @enterpriseId;

    set @individualId = (
        select idIndividualClients
    from TBL_INDIVIDUAL_CLIENTS
    where idUser = @userId
    )
    if(@individualId is not null )
        return @individualId;

    set @adminId = (
        select idAdmin
    from TBL_ADMINS
    where idUser = @userId
    )
    if(@adminId is not null )
        return @adminId;

    return null
END;
IF OBJECT_ID (N'FT_COMPANY_TYPES', N'IF') IS NOT NULL  
    DROP FUNCTION FT_COMPANY_TYPES;  
GO  
create function FT_COMPANY_TYPES()
returns TABLE
as
RETURN(
    SELECT idCompanyType as id,[name] FROM TBL_COMPANY_TYPE
)
CREATE FUNCTION [dbo].[FT_GET_ALL_PRODUCTS_DATA_ENTERPRISE](@id INT)
RETURNS @allProductsData TABLE(
    idProduct INT NULL,
    productName VARCHAR(45) NULL,
    productImage IMAGE NULL,
    productDescription VARCHAR(200) NULL,
    category VARCHAR(45) NULL,
    sarType VARCHAR(45) NULL,
    companyType VARCHAR(45),
    unitPrice FLOAT NULL
)
AS
BEGIN

    DECLARE @company VARCHAR(45) = '';

    SELECT @company = ct.name
    FROM TBL_ENTERPRISE_CLIENTS ec
    INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
    INNER JOIN TBL_COMPANY_TYPE ct ON ec.idCompanyType = ct.idCompanyType
    WHERE u.idUser = @id;

    BEGIN
    INSERT INTO @allProductsData
        SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription, 
                c.name category, st.description sarType, ct.name companyType, price.unit_price 
        FROM TBL_PRODUCTS p 
        INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes 
        INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct 
        INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType 
        INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices 
        INNER JOIN PRODUCTS_has_CATEGORIES phc ON p.idProducts = phc.idProducts
        INNER JOIN TBL_CATEGORIES c ON phc.idCategories = c.idCategories
        WHERE ct.name = @company;
    END
RETURN
END
GO

CREATE FUNCTION [dbo].[FT_GET_ALL_PRODUCTS_DATA_INDIVIDUAL]()
RETURNS TABLE
AS
RETURN
(
    SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription, 
            c.name category, st.description sarType, price.unit_price 
    FROM TBL_PRODUCTS p 
    INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes 
    INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct 
    INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType 
    INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices 
    INNER JOIN PRODUCTS_has_CATEGORIES phc ON p.idProducts = phc.idProducts
    INNER JOIN TBL_CATEGORIES c ON phc.idCategories = c.idCategories
    WHERE ct.name = 'restaurante'
)

GO
IF OBJECT_ID (N'FT_GET_CATEGORIES', N'IF') IS NOT NULL
    DROP FUNCTION [FT_GET_CATEGORIES];
GO
CREATE FUNCTION [FT_GET_CATEGORIES] ()
RETURNS TABLE
AS  
RETURN(
    SELECT  idCategories as id,
            name as name
    FROM [pyflor].[dbo].[TBL_CATEGORIES]
)

IF OBJECT_ID (N'FT_GET_DATA_ENTERPRISE') IS NOT NULL  
    DROP FUNCTION FT_GET_DATA_ENTERPRISE;  
GO 

CREATE FUNCTION FT_GET_DATA_ENTERPRISE (@id int)
 RETURNS TABLE
 AS 
 RETURN(
     SELECT ec.company_name,u.email,u.phone,u.address,ec.contact_name,ec.contact_number 
     FROM TBL_ENTERPRISE_CLIENTS ec
     INNER JOIN TBL_USERS u
     ON ec.idUser=u.idUser
     WHERE u.idUser=@id
     )

  


IF OBJECT_ID (N'FT_GET_DELIVERY_TYPE', N'IF') IS NOT NULL
    DROP FUNCTION [FT_GET_DELIVERY_TYPE];
GO
CREATE FUNCTION [FT_GET_DELIVERY_TYPE] ()
RETURNS TABLE
AS  
RETURN(
    SELECT  idDeliveryType as id,
            name as name
    FROM [pyflor].[dbo].[TBL_DELIVERY_TYPES]
)

IF OBJECT_ID (N'FT_GET_DEPARTMENTS', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_DEPARTMENTS;  
GO  
create FUNCTION FT_GET_DEPARTMENTS()
RETURNS TABLE
AS
RETURN
SELECT 
    idDepartments as id,
    [name]
FROM
    TBL_DEPARTMENTS
CREATE FUNCTION [dbo].[FT_GET_EMPLOYEES_DATA]()
RETURNS TABLE
AS
RETURN
(
    SELECT e.idEmployees, 
        u.name userName,  
        u.lastname, 
        j.name jobTitle,
        d.name departmentName, 
        e.admission_date, 
        u.email, 
        u.phone, 
        u.address
    FROM TBL_EMPLOYEES e
    INNER JOIN TBL_USERS u ON e.idUser = u.idUser
    INNER JOIN TBL_JOB_TITLES j ON e.idJobTitle = j.idJobTitle
    INNER JOIN TBL_DEPARTMENTS d ON e.idDepartments = d.idDepartments
)

GO
IF OBJECT_ID (N'FT_GET_INDIVIDUAL_USER_DATA', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_INDIVIDUAL_USER_DATA];  
GO  
CREATE FUNCTION [FT_GET_INDIVIDUAL_USER_DATA] (@id INT)  
RETURNS TABLE  
AS  
RETURN(
       SELECT 
        u.name ,u.lastname, u.email, u.address,u.phone
    from 
        TBL_USERS as u
    WHERE 
        idUser = @id
)
IF OBJECT_ID (N'FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL;  
GO  
CREATE FUNCTION FT_GET_PRODUCTS_IN_REQUEST_INDIVIDUAL (@requestId int, @user int)  
RETURNS @products TABLE (
    name VARCHAR(45), 
    description VARCHAR(200), 
    quantity int, 
    unit_price float,
    control int
) 
AS
BEGIN
    declare @control table (request int, url VARCHAR(200), state int)
    declare @isValid int
    declare @state int
    declare @quantity int
    
    insert into @products
    select  pr.name, 
            pr.description, 
            rhp.quantity, 
            ps.unit_price,
            0 control
    FROM REQUESTS_has_PRODUCTS rhp
    INNER JOIN TBL_PRODUCTS pr
        on pr.idProducts = rhp.idProducts
    INNER JOIN PRODUCTS_has_CATEGORIES phc
        on phc.idProducts = pr.idProducts
    INNER JOIN TBL_CATEGORIES c
        on c.idCategories = phc.idCategories
    INNER JOIN TBL_PRODUCT_HAS_PRICES php
        on php.idProduct = pr.idProducts
    INNER JOIN TBL_PRICES ps
        on ps.idPrices = php.idPrice
    INNER JOIN TBL_COMPANY_TYPE ct
        on ct.idCompanyType = php.idCompanyType
    INNER JOIN TBL_REQUESTS rq
        on rq.idRequests = rhp.idRequest
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic
        on ic.idIndividualClients = rq.idIndividualClient
    and ic.idUser = @user
    and ct.name = 'restaurante';

    select @quantity = count(*) from @products
    if @quantity >= 1
    BEGIN
        insert into @control
        select  idRequests request, 
            urlWithToken url, 
            idState state 
        from bill_has_state bhs
        inner join TBL_BILLS b
            on b.idBills = bhs.idBill
        where idRequests = @requestId

        select @isValid = COUNT(*) from @control
        IF @isValid > 0
        BEGIN
            select @state = state from @control
            IF @state = 1
            BEGIN
                delete from @products
                insert into @products
                select  null name,
                        (select url from @control) description,
                        null quantity,
                        null unit_price,
                        1 control
                RETURN
            END;

            IF @state = 2
            BEGIN
                delete from @products
                insert into @products
                select  null name,
                        'request alredy payed' description,
                        null quantity,
                        null unit_price,
                        2 control
                RETURN
            END;
        END;
    END;

    RETURN
END;
GO

IF OBJECT_ID (N'FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE', N'IF') IS NOT NULL  
    DROP FUNCTION FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE;  
GO  
CREATE FUNCTION FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE (@requestId int, @user int)  
RETURNS @products TABLE (
    name VARCHAR(45), 
    description VARCHAR(200), 
    quantity int, 
    unit_price float,
    control int
)  
AS
BEGIN
    declare @control table (request int, url VARCHAR(200), state int)
    declare @isValid int
    declare @state int
    declare @quantity int

    insert into @products
    select  pr.name, 
            pr.description, 
            rhp.quantity, 
            ps.unit_price price,
            0 control
    FROM REQUESTS_has_PRODUCTS rhp
    INNER JOIN TBL_PRODUCTS pr
        on pr.idProducts = rhp.idProducts
    INNER JOIN TBL_PRODUCT_HAS_PRICES php
        on php.idProduct = pr.idProducts
    INNER JOIN TBL_PRICES ps
        on ps.idPrices = php.idPrice
    INNER JOIN TBL_COMPANY_TYPE ct
        on ct.idCompanyType = php.idCompanyType
    WHERE rhp.idRequest = @requestId
    and ct.idCompanyType =  
    (
        select ecs.idCompanyType
        from TBL_ENTERPRISE_CLIENTS ecs
        INNER JOIN TBL_COMPANY_TYPE cts
            ON ecs.idCompanyType = cts.idCompanyType
        INNER JOIN TBL_REQUESTS rq
            ON rq.idEnterpriseClient = ecs.idEnterpriseClients
        WHERE rq.idRequests = @requestId
        AND ecs.idUser = @user
    )

    select @quantity = count(*) from @products
    if @quantity >= 1
    BEGIN
        insert into @control
        select  idRequests request, 
            urlWithToken url, 
            idState state 
        from bill_has_state bhs
        inner join TBL_BILLS b
            on b.idBills = bhs.idBill
        where idRequests = @requestId

        select @isValid = COUNT(*) from @control
        IF @isValid > 0
        BEGIN
            select @state = state from @control
            IF @state = 1
            BEGIN
                delete from @products
                insert into @products
                select  null name,
                        (select url from @control) description,
                        null quantity,
                        null unit_price,
                        1 control
                RETURN
            END;

            IF @state = 2
            BEGIN
                delete from @products
                insert into @products
                select  null name,
                        'request alredy payed' description,
                        null quantity,
                        null unit_price,
                        2 control
                RETURN
            END;
        END;
    END;

    RETURN
END
GO

IF OBJECT_ID (N'FT_GET_PROVIDER', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_PROVIDER];  
GO  
CREATE FUNCTION [FT_GET_PROVIDER] (
    @id INT
)  
RETURNS TABLE  
AS  
RETURN(
    SELECT  idProviders as id, 
            name as name, 
            phone_contact as phone,
            email as email 
    FROM [pyflor].[dbo].[TBL_PROVIDERS]
    WHERE idProviders = @id
)
CREATE FUNCTION FT_GET_REQUEST_DATA()
 RETURNS TABLE
 AS 
 RETURN(
    SELECT r.idRequests idRequest, u.name client, dt.name deliveryType,
        pm.description paymentMethod,  r.emission_date
    FROM TBL_REQUESTS r
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
    INNER JOIN TBL_USERS u ON ic.idUser = u.idUser
    INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
    INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
    UNION 
    SELECT r.idRequests idRequest, ec.company_name client, dt.name deliveryType,
            pm.description paymentMethod,  r.emission_date
    FROM TBL_REQUESTS r
    INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
    INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
    INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType

)


IF OBJECT_ID (N'FT_GET_REQUEST_DETAIL_EMPLOYEE') IS NOT NULL  
    DROP FUNCTION FT_GET_REQUEST_DETAIL_EMPLOYEE;  
GO 

CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL_EMPLOYEE](@idReq INT)
RETURNS @requestDetail TABLE (
	idRequest INT NULL,
    idClient INT NULL,
    client VARCHAR (70) NULL,
	emissionDate DATETIME NULL,
	deliveryType VARCHAR(45) NULL,
	deliveryDescription VARCHAR(150) NULL,
	paymentMethod VARCHAR(45) NULL,
	idProduct INT NULL,
	products VARCHAR(45) NULL,
	quantity INT NULL,
	subtotal DECIMAL(10,2) NULL,
	success BIT NULL
)
AS
BEGIN	
	DECLARE @billIdP INT = null;
	DECLARE @billIdC INT = null;
	declare @tmp int = 0;

	SELECT @billIdP = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills;

	SELECT @billIdC = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills;

	IF (@billIdP > 0) 
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
            ic.idIndividualClients,
            CONCAT(u.name, ' ', u.lastname) as nombre,
			r.emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			(pb.maquila + pb.net_plant) subtotal,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
		WHERE r.idRequests = @idReq
        UNION
        SELECT r.idRequests,
        ec.idEnterpriseClients,
            ec.company_name,
			r.emission_date emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			(pb.maquila + pb.net_plant) subtotal,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
		INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
		WHERE r.idRequests = @idReq

		select @tmp = count(*) from @requestDetail
		if @tmp > 0
		begin
		RETURN
		end;
	END;

	IF (@billIdC > 0)
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
            ic.idIndividualClients,
            CONCAT(u.name, ' ', u.lastname) as nombre,
			r.emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			cb.sub_total,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
		WHERE r.idRequests = @idReq
        UNION
        SELECT r.idRequests,
        ec.idEnterpriseClients,
            ec.company_name,
			r.emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			cb.sub_total,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
		INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
		WHERE r.idRequests = @idReq

		select @tmp = count(*) from @requestDetail
		if @tmp > 0
		begin
		RETURN
		end;
	END;

RETURN
END
GO
IF OBJECT_ID (N'FT_GET_REQUEST_DETAIL_ENTERPRISE') IS NOT NULL  
    DROP FUNCTION FT_GET_REQUEST_DETAIL_ENTERPRISE;  
GO 

CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL_ENTERPRISE](@id INT, @idReq INT)
RETURNS @requestDetail TABLE (
	idRequest INT NULL,
	emissionDate DATETIME NULL,
	deliveryType VARCHAR(45) NULL,
	deliveryDescription VARCHAR(150) NULL,
	paymentMethod VARCHAR(45) NULL,
	idProduct INT NULL,
	products VARCHAR(45) NULL,
	quantity INT NULL,
	subtotal DECIMAL(10,2) NULL,
	success BIT NULL
)
AS
BEGIN	
	DECLARE @billIdP INT = 0;
	DECLARE @billIdC INT = 0;
	declare @tmp int = 0;

	SELECT @billIdP = COUNT(b.idBills)
	FROM TBL_BILLS b
	INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills;

	SELECT @billIdC = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills;


	IF @billIdP > 0
		BEGIN
			INSERT INTO @requestDetail
			SELECT r.idRequests,
				r.emission_date emission_date,
				dt.name deliveryType,
				r.deliveryDescription,
				pm.description paymentMethod,
				p.idProducts idProduct,
				p.name product,
				rhp.quantity,
				(pb.maquila + pb.net_plant) subtotal,
				1
			FROM TBL_REQUESTS r
			INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
			INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
			INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
			INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
			INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
			INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
			INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
			INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
			WHERE u.idUser = @id AND r.idRequests = @idReq
			select @tmp = count(*) from @requestDetail
			if @tmp > 0
			begin
			RETURN
			end;
		END;
	
	IF @billIdC > 0
		BEGIN
			INSERT INTO @requestDetail
			SELECT r.idRequests,
				r.emission_date,
				dt.name deliveryType,
				r.deliveryDescription,
				pm.description paymentMethod,
				p.idProducts idProduct,
				p.name product,
				rhp.quantity,
				cb.sub_total,
				1
			FROM TBL_REQUESTS r
			INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
			INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
			INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
			INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
			INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
			INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
			INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
			INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
			WHERE u.idUser = @id AND r.idRequests = @idReq
			select @tmp = count(*) from @requestDetail
			if @tmp > 0
			begin
			RETURN
			end; 
		END;
RETURN 
END
GO


IF OBJECT_ID (N'FT_GET_REQUEST_DETAIL_INDIVIDUAL') IS NOT NULL  
    DROP FUNCTION FT_GET_REQUEST_DETAIL_INDIVIDUAL;  
GO 

CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL_INDIVIDUAL](@id INT, @idReq INT)
RETURNS @requestDetail TABLE (
	idRequest INT NULL,
	emissionDate DATETIME NULL,
	deliveryType VARCHAR(45) NULL,
	deliveryDescription VARCHAR(150) NULL,
	paymentMethod VARCHAR(45) NULL,
	idProduct INT NULL,
	products VARCHAR(45) NULL,
	quantity INT NULL,
	subtotal DECIMAL(10,2) NULL,
	success BIT NULL
)
AS
BEGIN	
	DECLARE @billIdP INT = null;
	DECLARE @billIdC INT = null;
	declare @tmp int = 0;

	SELECT @billIdP = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills;

	SELECT @billIdC = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills;

	IF (@billIdP > 0) 
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
			r.emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			(pb.maquila + pb.net_plant) subtotal,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
		WHERE u.idUser = @id AND r.idRequests = @idReq
		select @tmp = count(*) from @requestDetail
		if @tmp > 0
		begin
		RETURN
		end;
	END;

	IF (@billIdC > 0)
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
			r.emission_date,
			dt.name deliveryType,
			r.deliveryDescription,
			pm.description paymentMethod,
			p.idProducts idProduct,
			p.name product,
			rhp.quantity,
			cb.sub_total,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
		WHERE u.idUser = @id AND r.idRequests = @idReq
		select @tmp = count(*) from @requestDetail
		if @tmp > 0
		begin
		RETURN
		end;
	END;

RETURN
END
GO
CREATE FUNCTION [dbo].[FT_GET_REQUEST_HISTORY_ENTERPRISE_CLIENT](@id int)
RETURNS TABLE
AS
RETURN
(
    SELECT r.idRequests as requests,r.emission_date  as emissionDate,dt.name as deliveryType,pm.description as paymentMethods
    FROM TBL_REQUESTS r 
    INNER JOIN TBL_DELIVERY_TYPES dt 
    ON dt.idDeliveryType=r.idDeliveryType
    INNER JOIN TBL_PAYMENT_METHODS pm 
    ON pm.idPaymentMethods=r.idPaymentMethods
    INNER JOIN TBL_ENTERPRISE_CLIENTS ec 
    ON ec.idEnterpriseClients=r.idEnterpriseClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ec.idUser
    WHERE us.idUser=@id
)



CREATE FUNCTION [dbo].[FT_GET_REQUEST_HISTORY_INDIVIDUAL_CLIENT](@id int)
RETURNS TABLE
AS
RETURN
(
    SELECT r.idRequests as requests,r.emission_date  as emissionDate,dt.name as deliveryType,pm.description as paymentMethods
    FROM TBL_REQUESTS r 
    INNER JOIN TBL_DELIVERY_TYPES dt 
    ON dt.idDeliveryType=r.idDeliveryType
    INNER JOIN TBL_PAYMENT_METHODS pm 
    ON pm.idPaymentMethods=r.idPaymentMethods
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic
    ON ic.idIndividualClients=r.idIndividualClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ic.idUser
    WHERE us.idUser=@id
)

IF OBJECT_ID (N'FT_GET_REQUEST_TYPE', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_REQUEST_TYPE];  
GO  
CREATE FUNCTION [FT_GET_REQUEST_TYPE] ()  
RETURNS TABLE  
AS  
RETURN(
    SELECT  idRequestType as id,
            name as name
    FROM [pyflor].[dbo].[TBL_REQUEST_TYPES]
)
CREATE FUNCTION [dbo].[FT_GET_SINGLE_PRODUCT_DATA](@id int)
RETURNS TABLE
AS
RETURN
(
    SELECT p.idProducts, p.name productName, p.productImage, p.description productDescription,
            c.name category, st.description sarType, ct.name companyType, price.unit_price
    FROM TBL_PRODUCTS p
    INNER JOIN TBL_SAR_TYPES st ON p.idSarTypes = st.idSarTypes
    INNER JOIN TBL_PRODUCT_HAS_PRICES php ON p.idProducts = php.idProduct
    INNER JOIN TBL_COMPANY_TYPE ct ON php.idCompanyType = ct.idCompanyType
    INNER JOIN TBL_PRICES price ON php.idPrice = price.idPrices
    INNER JOIN PRODUCTS_has_CATEGORIES phc ON p.idProducts = phc.idProducts
    INNER JOIN TBL_CATEGORIES c ON phc.idCategories = c.idCategories
    WHERE @id = p.idProducts
)

GO
IF OBJECT_ID (N'FT_PROVIDERS', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_PROVIDERS];  
GO  
CREATE FUNCTION [FT_PROVIDERS] ()  
RETURNS TABLE  
AS  
RETURN(
    SELECT  idProviders as id, 
            name as name, 
            phone_contact as phone,
            email as email 
    FROM [pyflor].[dbo].[TBL_PROVIDERS]
)
IF OBJECT_ID (N'FT_REFFERALS', N'IF') IS NOT NULL  
    DROP FUNCTION FT_REFFERALS;  
GO  
CREATE FUNCTION FT_REFFERALS()
RETURNS TABLE
AS
RETURN
    SELECT 
        r.idRefferals idRefferal,
        r.idOrders as idOrder,
        o.emission_date,
        o.expired_date,
        userCreated.name + ' '+ userCreated.lastname as CreatedEmployee,
        senderUser.name + ' '+senderUser.lastname as SenderEmployee,
        receiverUser.name + ' '+receiverUser.lastname as ReceiverEmployee,
        addresseeUser.name +' '+addresseeUser.lastname as AddresseeEmployee
    FROM
        TBL_REFFERALS as r
    LEFT JOIN 
        TBL_ORDERS AS o
    ON 
        o.idOrders=r.idOrders
    LEFT JOIN 
        TBL_EMPLOYEES as createdEmployee
    ON 
        o.idEmployees=createdEmployee.idEmployees
    LEFT JOIN 
        TBL_EMPLOYEES as senderEmployee
    on 
        o.idSenderEmployee=senderEmployee.idEmployees
    LEFT JOIN 
        TBL_EMPLOYEES as receiverEmployee
    on 
        o.idReceiverEmployee=receiverEmployee.idEmployees
    LEFT JOIN 
        TBL_EMPLOYEES as addresseeEmployee
    on 
        o.idAddresseeEmployee=addresseeEmployee.idEmployees
    LEFT JOIN 
        TBL_USERS AS userCreated
    ON 
        userCreated.idUser = createdEmployee.idUser
    LEFT JOIN 
        TBL_USERS AS senderUser
    on 
        senderUser.idUser = senderEmployee.idUser
    LEFT JOIN 
        TBL_USERS AS receiverUser
    on 
        receiverUser.idUser = receiverEmployee.idUser
    LEFT JOIN 
        TBL_USERS AS addresseeUser
    on 
        addresseeUser.idUser = addresseeEmployee.idEmployees
IF OBJECT_ID (N'FT_getJobtitles', N'IF') IS NOT NULL  
    DROP FUNCTION FT_getJobtitles;  
GO  
create FUNCTION FT_getJobtitles()
RETURNS TABLE
AS
RETURN
SELECT 
    idJobTitle as id,
    [name]
FROM
    TBL_JOB_TITLES

IF OBJECT_ID (N'dbo.getUserRole', N'FN') IS NOT NULL  
    DROP FUNCTION getUserRole;  
GO
CREATE FUNCTION [dbo].[getUserRole](@userId int)  
RETURNS varchar(10)
AS   
-- Returns the user role  
BEGIN
    declare @employeeId int = null;
    declare @enterpriseId int = null;
    declare @individualId int = null;
    declare @adminId int = null;

    declare @role varchar(10)
    set @role = 'none'

    set @employeeId = (
        select idEmployees
    from TBL_EMPLOYEES
    where idUser = @userId
    )
    if(@employeeId is not null )
        return 'employee';

    set @enterpriseId = (
        select idEnterpriseClients
    from TBL_ENTERPRISE_CLIENTS
    where idUser = @userId
    )
    if(@enterpriseId is not null )
        return 'enterprise';

    set @individualId = (
        select idIndividualClients
    from TBL_INDIVIDUAL_CLIENTS
    where idUser = @userId
    )
    if(@individualId is not null )
        return 'individual';

    set @adminId = (
        select idAdmin
    from TBL_ADMINS
    where idUser = @userId
    )
    if(@adminId is not null )
        return 'admin';

    return @role;
END; 
IF OBJECT_ID (N'getCompaniesNumber', N'FN') IS NOT NULL  
    DROP FUNCTION getCompaniesNumber;  
GO
CREATE FUNCTION getCompaniesNumber()  
RETURNS TABLE
AS   
RETURN 
 SELECT idCompanyType 
 FROM TBL_COMPANY_TYPE



IF OBJECT_ID (N'F_Get_Supplies_Inventory', N'IF') IS NOT NULL  
    DROP FUNCTION F_Get_Supplies_Inventory;  
GO  
CREATE FUNCTION F_Get_Supplies_Inventory ()  
RETURNS TABLE  
AS  
RETURN   
(  
    SELECT ord.idOrders as No_Orden, sup.name as Supplie_Name, unit_price,quantity,emission_date, us.name+' '+lastname as Receiver_Employee
        FROM TBL_ORDERS ord
        INNER JOIN TBL_ORDER_DETAILS ordd ON ordd.idOrders=ord.idOrders
        INNER JOIN TBL_SUPPLIES sup ON sup.idSupplies=ordd.idSupplies
        INNER JOIN TBL_EMPLOYEES em ON em.idEmployees=ord.idReceiverEmployee
        INNER JOIN TBL_USERS us ON us.idUser=em.idUser
);  


IF OBJECT_ID (N'F_SUPPLIES', N'IF') IS NOT NULL  
    DROP FUNCTION F_SUPPLIES;  
GO  
create function F_SUPPLIES()
returns TABLE
as
RETURN
    SELECT
        s.idSupplies as id,
        s.[name],
        s.[type],
        s.unit_price as unitPrice,
        st.[description] as sarType
    FROM
        dbo.TBL_SUPPLIES as s
    INNER JOIN TBL_SAR_TYPES as st
    ON st.idSarTypes = s.TBL_SAR_TYPES_idSarTypes

