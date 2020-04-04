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

