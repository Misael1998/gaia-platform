IF OBJECT_ID (N'F_Get_Supplies_Inventory', N'IF') IS NOT NULL  
    DROP FUNCTION F_Get_Supplies_Inventory;  
GO  
CREATE FUNCTION F_Get_Supplies_Inventory ()  
RETURNS TABLE  
AS  
RETURN   
(  
    SELECT ord.idOrders as No_Orden, sup.name as Supplie_Name, unit_price,quantity,emission_date, us.name+' '+lastname as Receiver_Employee
        FROM TBL_ORDERS ord
        INNER JOIN TBL_ORDER_DETAILS ordd ON ordd.idOrders=ord.idOrders
        INNER JOIN TBL_SUPPLIES sup ON sup.idSupplies=ordd.idSupplies
        INNER JOIN TBL_EMPLOYEES em ON em.idEmployees=ord.idReceiverEmployee
        INNER JOIN TBL_USERS us ON us.idUser=em.idUser
);  

