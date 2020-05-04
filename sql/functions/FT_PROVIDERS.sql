IF OBJECT_ID (N'FT_PROVIDERS') IS NOT NULL  
    DROP FUNCTION [FT_PROVIDERS];  
GO
CREATE FUNCTION [FT_PROVIDERS] ()  
RETURNS TABLE  
AS  
RETURN(
    SELECT idProviders as id,
    name as name,
    phone_contact as phone,
    email as email
FROM [pyflor].[dbo].[TBL_PROVIDERS]
)
GO