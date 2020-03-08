IF OBJECT_ID (N'FT_GET_REQUEST_TYPE', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_REQUEST_TYPE];  
GO  
CREATE FUNCTION [FT_GET_REQUEST_TYPE] ()  
RETURNS TABLE  
AS  
RETURN(
    SELECT  idRequestType as id,
            name as name
    FROM [pyflor].[dbo].[TBL_REQUEST_TYPES]
)