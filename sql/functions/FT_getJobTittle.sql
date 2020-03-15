IF OBJECT_ID (N'FT_getJobTittle', N'IF') IS NOT NULL  
    DROP FUNCTION FT_getJobTittle;  
GO  
create FUNCTION FT_getJobTittle(@id int)
RETURNS TABLE
AS
RETURN
SELECT
    jt.idJobTitle as id,
    jt.name
FROM
    TBL_EMPLOYEES AS e
INNER JOIN TBL_JOB_TITLES AS jt
ON e.idJobTitle=jt.idJobTitle
WHERE
    e.idEmployees = @id