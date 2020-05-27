IF OBJECT_ID (N'FT_GET_BILL') IS NOT NULL
    DROP FUNCTION [FT_GET_BILL];
GO
CREATE FUNCTION [FT_GET_BILL] (@idRequest INT)
 RETURNS  @bill  TABLE
 (          rtn   VARCHAR(14),          addressClient VARCHAR(100),  
            num_bill VARCHAR(100),      emission_date DATE,
            nameProduct VARCHAR(45),    quantity INT ,
            unit_price FLOAT,           importeTotal FLOAT,
            sub_total FLOAT,            total FLOAT,
            shipping FLOAT,             exent FLOAT,
            import FLOAT,               aliquot_rate FLOAT,
            nameClient VARCHAR(45), typeBill VARCHAR(10))
 AS 
 BEGIN
 DECLARE @userTMP INT
DECLARE  @type VARCHAR(10)

 set @type = (select dbo.FN_GET_BILL_TYPE(@idRequest))

 SET @userTMP =(SELECT ec.idEnterpriseClients
                  FROM TBL_ENTERPRISE_CLIENTS ec 
                  INNER JOIN TBL_REQUESTS r 
                  ON r.idEnterpriseClient=ec.idEnterpriseClients
                  WHERE r.idRequests=@idRequest )
IF (@type = 'C') 

   IF (@userTMP IS NOT NULL)
 
    INSERT @bill
    SELECT    ec.RTN,         us.address,
              b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              cb.sub_total,   cb.total,
              rq.shipping,    cb.exent,
              cb.import,      cb.aliquot_rate, ec.company_name as nameClient,@type typeBill
              
    FROM TBL_REQUESTS rq 
    INNER JOIN TBL_ENTERPRISE_CLIENTS ec 
    ON ec.idEnterpriseClients=rq.idEnterpriseClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ec.idUser
    INNER JOIN TBL_COMPANY_TYPE ct 
    ON ct.idCompanyType=ec.idCompanyType
    INNER JOIN TBL_BILLS b 
    ON b.idRequests=rq.idRequests
    INNER JOIN TBL_CAI_BILL cb 
    ON cb.idBills=b.idBills
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
                  WHERE r.idRequests=@idRequest )
IF (@userTMP IS NOT NULL)   
  INSERT @bill
    SELECT    null rtn,         us.address,
              b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              cb.sub_total,   cb.total,
              rq.shipping,    cb.exent,
              cb.import,      cb.aliquot_rate,us.name+' '+us.lastname as nameClient,@type typeBill
    FROM TBL_REQUESTS rq 
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic 
    ON ic.idIndividualClients=rq.idIndividualClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ic.idUser
    INNER JOIN TBL_BILLS b 
    ON b.idRequests=rq.idRequests
    INNER JOIN TBL_CAI_BILL cb 
    ON cb.idBills=b.idBills
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


IF (@type = 'P')

IF (@userTMP IS NOT NULL)
 
    INSERT @bill
    SELECT    ec.RTN,         us.address,
              b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              pb.sub_total,   pb.total,
              null shipping,   null exent,
              null import,    null aliquot_rate,ec.company_name nameClient,@type typeBill
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
    ON b.idBills=pb.idBills
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
                  WHERE r.idRequests=@idRequest )

IF (@userTMP IS NOT NULL)   
  INSERT @bill
    SELECT    null rtn,         us.address,
              b.num_bill,     b.emission_date,
              p.name,         rp.quantity,
              pr.unit_price,  (pr.unit_price*rp.quantity) as importeTotal,
              pb.sub_total,   pb.total,
              null shipping,  null exent,
              null import,    null aliquot_rate,us.name+' '+us.lastname as nameClient,@type typeBill
    FROM TBL_REQUESTS rq 
    INNER JOIN TBL_INDIVIDUAL_CLIENTS ic 
    ON ic.idIndividualClients=rq.idIndividualClient
    INNER JOIN TBL_USERS us 
    ON us.idUser=ic.idUser
    INNER JOIN TBL_BILLS b 
    ON b.idRequests=rq.idRequests
    INNER JOIN TBL_PRO_BILL pb 
    ON b.idBills=pb.idBills
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

IF (@type = 'none')
INSERT @bill
    SELECT    null RTN,         null addressClient,
              null num_bill,    null emission_date,
              null nameC,         null quantity,
              null unit_price,  null  importeTotal,
              null sub_total,   null total,
              null shipping,  null exent,
              null import,    null aliquot_rate,null nameClient,@type typeBill
    FROM TBL_REQUESTS 

RETURN
END
GO


