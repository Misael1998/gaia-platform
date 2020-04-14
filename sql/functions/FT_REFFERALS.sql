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
GO