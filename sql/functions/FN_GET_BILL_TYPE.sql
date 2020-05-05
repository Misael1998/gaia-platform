IF OBJECT_ID (N'FN_GET_BILL_TYPE') IS NOT NULL
    DROP FUNCTION [FN_GET_BILL_TYPE];
GO
CREATE FUNCTION [FN_GET_BILL_TYPE] 
 (@idRequest INT)
RETURNS varchar(10) -- P para probill y C para caibill
AS
BEGIN
    DECLARE @count INT
    DECLARE @type VARCHAR(10)

    SET @type='none';


    SET @count = (
        SELECT COUNT(*)
    FROM TBL_BILLS b
        INNER JOIN TBL_PRO_BILL pb
        ON pb.idBills=b.idBills
    WHERE b.idRequests= @idRequest
        )
    IF (@count = 1 ) 
        return 'P';

    SET @count = (
        SELECT COUNT(*)
    FROM TBL_BILLS b
        INNER JOIN TBL_CAI_BILL cb
        ON cb.idBills=b.idBills
    WHERE b.idRequests= @idRequest
        )
    IF (@count = 1 ) 
        return 'C';
    RETURN @type;

END;
GO
