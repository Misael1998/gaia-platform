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
    @CodeState int out, /*codeState:  1=successful, 2=unsuccessfully */
    @employeeName VARCHAR(45) out,
    @providersName VARCHAR(45) out,
    @sarDescription VARCHAR(45) out,
    @paymentMethodName VARCHAR(45) out,
    @supplyName VARCHAR(45) out,
    @senderName VARCHAR(45) out,
    @receiverName VARCHAR(45) out,
    @addressName VARCHAR(45) out,
    @idOrder INT out,
    @total FLOAT out,
    @isv FLOAT out,
    @value FLOAT out

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

    IF @VN_count>0 BEGIN

        IF @idProviders=' ' OR @idProviders IS NULL BEGIN
            SET @pcMsj='Invalid Field Provider';
            SET @CodeState=2;
            RETURN;
        END;

        SET @VN_TempID_order = (
            SELECT idOrders
            FROM TBL_ORDERS
            WHERE(SELECT idProviders 
                FROM TBL_ORDERS ord
                INNER JOIN TBL_BILLS b ON b.idOrders=ord.idOrders
                WHERE num_bill=@numBill)=@idProviders
        )
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
        /*cambios por si la cago*/
        SET @CodeState=1;
        SET @pcMsj = 'Successful';

        /*---------------------------------------------------*/


        SET @employeeName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idCreatedEmployee
        );

        SET @senderName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idSenderEmployee
        );



        SET @receiverName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idReceiverEmployee
        );


        SET @addressName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idAddressEmployee
        );

        SET @providersName = (
        select 
            name 
        from 
            TBL_PROVIDERS as providers
        WHERE
            providers.idProviders = @idProviders
        );

        SET @sarDescription = (
        select 
            [description]
        from 
            TBL_SAR_TYPES as sarTpyes
        WHERE
            sarTpyes.idSarTypes = @idSartype
        );

        SET @paymentMethodName = (
        select 
            [description]
        from 
            TBL_PAYMENT_METHODS as paymentMethods
        WHERE
            paymentMethods.idPaymentMethods = @idPaymentMethods
        );

        SET @supplyName = (
        select 
            name
        from 
            TBL_SUPPLIES as supplies
        WHERE
            supplies.idSupplies = @idSupplie
        );

        SET @idOrder = (
        select 
            MAX(idOrders)
        from 
            TBL_ORDERS
        );

        SET @isv = (
        select 
            MAX(isv)
        from 
            TBL_ORDERS
        );

        SET @total = (
        select 
            MAX(total)
        from 
            TBL_ORDERS
        );

        SET @value = (
        select 
            MAX(value)
        from 
            TBL_ORDERS
        );

        /*---------------------------------------------*/
        
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

                /*---------------------------------------------------*/


        SET @employeeName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idCreatedEmployee
        );

        SET @senderName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idSenderEmployee
        );



        SET @receiverName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idReceiverEmployee
        );


        SET @addressName = (
        select 
            users.name username 
        from 
            TBL_EMPLOYEES employee 
        INNER join 
            TBL_USERS users
        ON 
            employee.idUser = users.idUser
        WHERE
            employee.idEmployees = @idAddressEmployee
        );

        SET @providersName = (
        select 
            name 
        from 
            TBL_PROVIDERS as providers
        WHERE
            providers.idProviders = @idProviders
        );

        SET @sarDescription = (
        select 
            [description]
        from 
            TBL_SAR_TYPES as sarTpyes
        WHERE
            sarTpyes.idSarTypes = @idSartype
        );

        SET @paymentMethodName = (
        select 
            [description]
        from 
            TBL_PAYMENT_METHODS as paymentMethods
        WHERE
            paymentMethods.idPaymentMethods = @idPaymentMethods
        );

        SET @supplyName = (
        select 
            name
        from 
            TBL_SUPPLIES as supplies
        WHERE
            supplies.idSupplies = @idSupplie
        );

        SET @idOrder = (
        select 
            MAX(idOrders)
        from 
            TBL_ORDERS 
        );


        SET @isv = (
        select 
            MAX(isv)
        from 
            TBL_ORDERS
        );

        SET @total = (
        select 
            MAX(total)
        from 
            TBL_ORDERS
        );

        SET @value = (
        select 
            MAX(value)
        from 
            TBL_ORDERS
        );
        /*---------------------------------------------*/


END;  
GO  



/*


SELECT * from TBL_SUPPLIES

delete from TBL_BILLS
delete from TBL_ORDER_DETAILS
delete from TBL_ORDERS

SELECT * from TBL_BILLS
SELECT * from TBL_ORDERS
SELECT * from TBL_ORDER_DETAILS

select * from TBL_ORDER_DETAILS
*/