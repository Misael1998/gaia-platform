IF OBJECT_ID (N'FT_getJobtitles', N'IF') IS NOT NULL  
    DROP FUNCTION FT_getJobtitles;  
GO
create FUNCTION FT_getJobtitles()
RETURNS TABLE
AS
RETURN
SELECT
    idJobTitle as id,
    [name]
FROM
    TBL_JOB_TITLES
GO