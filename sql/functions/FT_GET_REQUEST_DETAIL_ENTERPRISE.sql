IF OBJECT_ID (N'FT_GET_REQUEST_DETAIL_ENTERPRISE') IS NOT NULL  
    DROP FUNCTION FT_GET_REQUEST_DETAIL_ENTERPRISE;  
GO 

CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL_ENTERPRISE](@id INT, @idReq INT)
RETURNS @requestDetail TABLE (
	idRequest INT NULL,
	emissionDate DATETIME NULL,
	deliveryType VARCHAR(45) NULL,
	deliveryDescription VARCHAR(150) NULL,
	paymentMethod VARCHAR(45) NULL,
	idProduct INT NULL,
	products VARCHAR(45) NULL,
	quantity INT NULL,
	subtotal DECIMAL(10,2) NULL,
	success BIT NULL
)
AS
BEGIN	
	DECLARE @billIdP INT = 0;
	DECLARE @billIdC INT = 0;
	declare @tmp int = 0;

	SELECT @billIdP = COUNT(b.idBills)
	FROM TBL_BILLS b
	INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills;

	SELECT @billIdC = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills;


	IF @billIdP > 0
		BEGIN
			INSERT INTO @requestDetail
			SELECT r.idRequests,
				r.emission_date emission_date,
				dt.name deliveryType,
				r.deliveryDescription,
				pm.description paymentMethod,
				p.idProducts idProduct,
				p.name product,
				rhp.quantity,
				(pb.maquila + pb.net_plant) subtotal,
				1
			FROM TBL_REQUESTS r
			INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
			INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
			INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
			INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
			INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
			INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
			INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
			INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
			WHERE u.idUser = @id AND r.idRequests = @idReq
			select @tmp = count(*) from @requestDetail
			if @tmp > 0
			begin
			RETURN
			end;
		END;
	
	IF @billIdC > 0
		BEGIN
			INSERT INTO @requestDetail
			SELECT r.idRequests,
				r.emission_date,
				dt.name deliveryType,
				r.deliveryDescription,
				pm.description paymentMethod,
				p.idProducts idProduct,
				p.name product,
				rhp.quantity,
				cb.sub_total,
				1
			FROM TBL_REQUESTS r
			INNER JOIN TBL_ENTERPRISE_CLIENTS ec ON r.idEnterpriseClient = ec.idEnterpriseClients
			INNER JOIN TBL_USERS u ON u.idUser = ec.idUser
			INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
			INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
			INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
			INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
			INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
			INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
			WHERE u.idUser = @id AND r.idRequests = @idReq
			select @tmp = count(*) from @requestDetail
			if @tmp > 0
			begin
			RETURN
			end; 
		END;
RETURN 
END
GO

