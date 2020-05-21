IF OBJECT_ID (N'getCompaniesNumber') IS NOT NULL  
    DROP FUNCTION getCompaniesNumber;  
GO
CREATE FUNCTION getCompaniesNumber()  
RETURNS TABLE
AS
RETURN 
 SELECT idCompanyType
FROM TBL_COMPANY_TYPE
GO
