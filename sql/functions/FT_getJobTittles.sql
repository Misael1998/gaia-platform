IF OBJECT_ID (N'FT_getJobTittles', N'IF') IS NOT NULL  
    DROP FUNCTION FT_getJobTittles;  
GO  
create FUNCTION FT_getJobTittles()
RETURNS TABLE
AS
RETURN
SELECT 
    idJobTitle as id,
    [name]
FROM
    TBL_JOB_TITLES