IF OBJECT_ID (N'FT_GET_EMPLOYEES_DATA') IS NOT NULL  
    DROP FUNCTION FT_GET_EMPLOYEES_DATA;  
GO
CREATE FUNCTION [dbo].[FT_GET_EMPLOYEES_DATA]()
RETURNS TABLE
AS
RETURN
(
    SELECT e.idEmployees,
    u.name userName,
    u.lastname,
    j.name jobTitle,
    d.name departmentName,
    e.admission_date,
    u.email,
    u.phone,
    u.address
FROM TBL_EMPLOYEES e
    INNER JOIN TBL_USERS u ON e.idUser = u.idUser
    INNER JOIN TBL_JOB_TITLES j ON e.idJobTitle = j.idJobTitle
    INNER JOIN TBL_DEPARTMENTS d ON e.idDepartments = d.idDepartments
)

GO