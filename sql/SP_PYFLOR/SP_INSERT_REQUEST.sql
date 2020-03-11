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
    @eClientID int,
    @iClientID int,
    @msj varchar(100) OUTPUT,
    @err VARCHAR(100) OUTPUT,
    @id int OUTPUT
AS
    declare @enterprise bit = 1
    declare @individual bit = 1
    declare @tmpId table (id int)
    IF @eClientID is null OR @eClientID = ''
    BEGIN
        SET @enterprise = 0
    END;

    IF @iClientID is null OR @iClientID = ''
    BEGIN
        SET @individual = 0
    END;

    IF @enterprise = @individual
    BEGIN
        set @msj = 'falied'
        set @id = null
        set @err = 'null or empty fields provided, or enterprise && individual provided'
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

    INSERT INTO [pyflor].[dbo].[TBL_REQUESTS]
    OUTPUT inserted.idRequests into @tmpId
    values(
        @deliveryID,
        @date,
        @shipping,
        @requestTypeID,
        @eClientID,
        @iClientID
    )

    set @msj = 'success'
    set @err = 'none'
    set @id = (select id from @tmpId)
    RETURN 1
GO
