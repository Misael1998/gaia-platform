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
            sum(tbl.unit_price * tbl.quantity)
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
            (select id
            from @idBill),
            @total,
            @total + (@total * 0.15)
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
            (select id
            from @idBill),
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
        (select id
        from @idBill),
        @total,
        @total + (@total * 0.15),
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
        (select id
        from @idBill),
        GETDATE(),
        @urlWithToken,
        @idPayment
    )

set @msg = 'success'
set @err = 'none'
return 1;

GO
