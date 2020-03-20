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


