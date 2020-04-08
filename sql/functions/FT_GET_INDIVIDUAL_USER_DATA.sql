IF OBJECT_ID (N'FT_GET_INDIVIDUAL_USER_DATA', N'IF') IS NOT NULL  
    DROP FUNCTION [FT_GET_INDIVIDUAL_USER_DATA];  
GO  
CREATE FUNCTION [FT_GET_INDIVIDUAL_USER_DATA] (@id INT)  
RETURNS TABLE  
AS  
RETURN(
       SELECT 
        u.name ,u.lastname, u.email, u.address 
    from 
        TBL_USERS as u
    WHERE 
        idUser = @id
)