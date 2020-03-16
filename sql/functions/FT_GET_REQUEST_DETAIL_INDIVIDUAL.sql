CREATE FUNCTION [dbo].[FT_GET_REQUEST_DETAIL_INDIVIDUAL](@id INT)
RETURNS @requestDetail TABLE (
	idRequest INT NULL,
	emissionDate DATETIME NULL,
	deliveryType VARCHAR(45) NULL,
	paymentMethod VARCHAR(45) NULL,
	products VARCHAR(45) NULL,
	quantity INT NULL,
	subtotal DECIMAL(10,2) NULL,
	success BIT NULL
)
AS
BEGIN	
	DECLARE @billIdP INT = null;
	DECLARE @billIdC INT = null;

	SELECT @billIdP = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills

	SELECT @billIdC = COUNT(b.idBills)   
	FROM TBL_BILLS b
	INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills

	IF (@billIdP > 0) 
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
			r.emission_date,
			dt.name deliveryType,
			pm.description paymentMethod,
			p.name product,
			rhp.quantity,
			(pb.maquila + pb.net_plant) subtotal,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_PRO_BILL pb ON b.idBills = pb.idBills
		WHERE r.idEnterpriseClient = NULL
		AND u.idUser = @id
	RETURN
	END;

	IF (@billIdC > 0)
	BEGIN
		INSERT INTO @requestDetail
		SELECT r.idRequests,
			r.emission_date,
			dt.name deliveryType,
			pm.description paymentMethod,
			p.name product,
			rhp.quantity,
			cb.sub_total,
			1
		FROM TBL_REQUESTS r
		INNER JOIN TBL_INDIVIDUAL_CLIENTS ic ON r.idIndividualClient = ic.idIndividualClients
		INNER JOIN TBL_USERS u ON u.idUser = ic.idUser
		INNER JOIN TBL_DELIVERY_TYPES dt ON r.idDeliveryType = dt.idDeliveryType
		INNER JOIN TBL_PAYMENT_METHODS pm ON r.idPaymentMethods = pm.idPaymentMethods
		INNER JOIN REQUESTS_has_PRODUCTS rhp ON r.idRequests = rhp.idRequest
		INNER JOIN TBL_PRODUCTS p ON p.idProducts = rhp.idProducts
		INNER JOIN TBL_BILLS b ON b.idRequests = r.idRequests
		INNER JOIN TBL_CAI_BILL cb ON b.idBills = cb.idBills 
		WHERE r.idEnterpriseClient = NULL
		AND u.idUser = @id
	RETURN
	END;

RETURN
END
GO