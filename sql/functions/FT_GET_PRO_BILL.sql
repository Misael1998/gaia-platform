IF OBJECT_ID (N'FT_GET_PRO_BILL') IS NOT NULL
    DROP FUNCTION [FT_GET_PRO_BILL];
GO
CREATE FUNCTION [FT_GET_PRO_BILL] (@idRequest INT)
 RETURNS  @bill  TABLE
 (            num_bill VARCHAR(100),     emission_date DATE,
              nameProduct VARCHAR(45),   quantity INT ,
              unit_price FLOAT,  importeTotal FLOAT,
              sub_total FLOAT,   total FLOAT,
              nameClient VARCHAR(45))
 AS 
 BEGIN
 DECLARE @userTMP INT

 SET @userTMP =(SELECT ec.idEnterpriseClients
                  FROM TBL_ENTERPRISE_CLIENTS ec 
                  INNER JOIN TBL_REQUESTS r 
                  ON r.idEnterpriseClient=ec.idEnterpriseClients
                  WHERE r.idRequests=@idRequest )

IF (@userTMP IS NOT NULL)
    INSERT @bill
    SELECT    b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              pb.sub_total,   pb.total, us.name+' '+us.lastname as nameClient
    FROM TBL_REQUESTS rq 
    INNER JOIN TBL_ENTERPRISE_CLIENTS ec 
    ON ec.idEnterpriseClients=rq.idEnterpriseClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ec.idUser
    INNER JOIN TBL_COMPANY_TYPE ct 
    ON ct.idCompanyType=ec.idCompanyType
    INNER JOIN TBL_BILLS b 
    ON b.idRequests=rq.idRequests
    INNER JOIN TBL_PRO_BILL pb 
    ON pb.idBills=b.idBills
    INNER JOIN REQUESTS_has_PRODUCTS rp 
    ON rp.idRequest=rq.idRequests
    INNER JOIN TBL_PRODUCTS p 
    ON p.idProducts=rp.idProducts
    INNER JOIN TBL_PRODUCT_HAS_PRICES pp 
    ON pp.idProduct=p.idProducts
    INNER JOIN TBL_PRICES pr 
    ON pr.idPrices=pp.idPrice
    WHERE rq.idRequests=@idRequest and ct.idCompanyType=pp.idCompanyType
ELSE 
    SET @userTMP =(SELECT ic.idIndividualClients
                  FROM TBL_INDIVIDUAL_CLIENTS ic 
                  INNER JOIN TBL_REQUESTS r 
                  ON r.idIndividualClient=ic.idIndividualClients
                  WHERE  r.idRequests=@idRequest )

IF (@userTMP IS NOT NULL)   
  INSERT @bill
    SELECT    b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              pb.sub_total,   pb.total,us.name+' '+us.lastname as nameClient
    FROM TBL_REQUESTS rq 
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic 
    ON ic.idIndividualClients=rq.idIndividualClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ic.idUser
    INNER JOIN TBL_BILLS b 
    ON b.idRequests=rq.idRequests
    INNER JOIN TBL_PRO_BILL pb 
    ON pb.idBills=b.idBills
    INNER JOIN REQUESTS_has_PRODUCTS rp 
    ON rp.idRequest=rq.idRequests
    INNER JOIN TBL_PRODUCTS p 
    ON p.idProducts=rp.idProducts
    INNER JOIN TBL_PRODUCT_HAS_PRICES pp 
    ON pp.idProduct=p.idProducts
    INNER JOIN TBL_COMPANY_TYPE ct 
    ON ct.idCompanyType=pp.idCompanyType
    INNER JOIN TBL_PRICES pr 
    ON pr.idPrices=pp.idPrice
    WHERE rq.idRequests=@idRequest and ct.name = 'restaurante'
RETURN
END
GO


SELECT * from FT_GET_PRO_BILL(16)