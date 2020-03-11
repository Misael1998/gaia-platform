create FUNCTION FT_REFFERALS()
RETURNS TABLE
AS
RETURN
    SELECT 
        r.idRefferals idRefferal,
        r.idOrders as idOrder,
        o.idReceiverEmployee,
        u.name as CreatedEmployee,
        uu.name as SenderEmployee,
        uuu.name as ReceiverEmployee,
        uuuu.name as AddresseeEmployee
    FROM
        TBL_REFFERALS as r
    INNER JOIN 
        TBL_ORDERS AS o
    ON 
        o.idOrders=r.idOrders
    INNER JOIN 
        TBL_EMPLOYEES as e
    ON 
        o.idEmployees=e.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as ee
    on 
        o.idSenderEmployee=ee.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as eee
    on 
        o.idReceiverEmployee=eee.idEmployees
    INNER JOIN 
        TBL_EMPLOYEES as eeee
    on 
        o.idAddresseeEmployee=eeee.idEmployees
    INNER JOIN 
        TBL_USERS AS u
    ON 
        u.idUser = e.idUser
    INNER JOIN 
        TBL_USERS AS uu
    on 
        uu.idUser = ee.idUser
    INNER JOIN 
        TBL_USERS AS uuu
    on 
        uuu.idUser = eee.idUser
    INNER JOIN 
        TBL_USERS AS uuuu
    on 
        uuuu.idUser = eeee.idUser