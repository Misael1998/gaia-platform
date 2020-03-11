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
        o.expired_date,
        o.emission_date,
        userCreated.name + ' '+ userCreated.lastname as CreatedEmployee,
        senderUser.name + ' '+senderUser.lastname as SenderEmployee,
        receiverUser.name + ' '+receiverUser.lastname as ReceiverEmployee,
        addresseeUser.name +' '+addresseeUser.lastname as AddresseeEmployee
    FROM
        TBL_REFFERALS as r
    INNER JOIN 
        TBL_ORDERS AS o
    ON 
        o.idOrders=r.idOrders
    INNER JOIN 
        TBL_EMPLOYEES as createdEmployee
    ON 
        o.idEmployees=createdEmployee.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as senderEmployee
    on 
        o.idSenderEmployee=senderEmployee.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as receiverEmployee
    on 
        o.idReceiverEmployee=receiverEmployee.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as addresseeEmployee
    on 
        o.idAddresseeEmployee=addresseeEmployee.idEmployees
    INNER JOIN 
        TBL_USERS AS userCreated
    ON 
        userCreated.idUser = createdEmployee.idUser
    INNER JOIN 
        TBL_USERS AS senderUser
    on 
        senderUser.idUser = senderEmployee.idUser
    INNER JOIN 
        TBL_USERS AS receiverUser
    on 
        receiverUser.idUser = receiverEmployee.idUser
    INNER JOIN 
        TBL_USERS AS addresseeUser
    on 
        addresseeUser.idUser = addresseeEmployee.idEmployees