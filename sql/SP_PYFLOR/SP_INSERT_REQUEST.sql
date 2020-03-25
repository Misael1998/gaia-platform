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
