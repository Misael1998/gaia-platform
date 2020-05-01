IF OBJECT_ID (N'FT_GET_DATA_ENTERPRISE') IS NOT NULL  
    DROP FUNCTION FT_GET_DATA_ENTERPRISE;  
GO

CREATE FUNCTION FT_GET_DATA_ENTERPRISE (@id int)
 RETURNS TABLE
 AS 
 RETURN(
     SELECT ec.company_name, u.email, u.phone, u.address, ec.contact_name, ec.contact_number
FROM TBL_ENTERPRISE_CLIENTS ec
    INNER JOIN TBL_USERS u
    ON ec.idUser=u.idUser
WHERE u.idUser=@id
     )
GO
  

