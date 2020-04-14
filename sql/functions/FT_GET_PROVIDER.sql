IF OBJECT_ID (N'FT_GET_PROVIDER', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_PROVIDER];  
GO
CREATE FUNCTION [FT_GET_PROVIDER] (
    @id INT
)  
RETURNS TABLE  
AS  
RETURN(
    SELECT idProviders as id,
    name as name,
    phone_contact as phone,
    email as email
FROM [pyflor].[dbo].[TBL_PROVIDERS]
WHERE idProviders = @id
)
GO