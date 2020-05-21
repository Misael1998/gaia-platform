IF OBJECT_ID (N'FT_GET_CATEGORIES') IS NOT NULL
    DROP FUNCTION [FT_GET_CATEGORIES];
GO
CREATE FUNCTION [FT_GET_CATEGORIES] ()
RETURNS TABLE
AS  
RETURN(
    SELECT idCategories as id,
    name as name
FROM [pyflor].[dbo].[TBL_CATEGORIES]
)
GO