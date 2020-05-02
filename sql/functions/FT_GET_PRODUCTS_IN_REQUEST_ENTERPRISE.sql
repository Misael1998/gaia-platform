IF OBJECT_ID (N'FT_GET_PRODUCTS_IN_REQUEST_ENTERPRISE') IS NOT NULL  
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
    declare @token varchar(150)

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
            select @token = url from @control
            IF @state = 1 AND @token is not null
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
