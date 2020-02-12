IF OBJECT_ID (N'dbo.getUserRole', N'FN') IS NOT NULL  
    DROP FUNCTION getUserRole;  
GO  
CREATE FUNCTION [dbo].[getUserRole](@userId int)  
RETURNS varchar(10)
AS   
-- Returns the user role  
BEGIN  
    declare @employeeId int;
    declare @enterpriseId int; 
    declare @individualId int;

    declare @role varchar(10)
    set @role = 'none'

    set @employeeId = (
        select idEmployees
            from TBL_EMPLOYEES
            where idUser = @userId
    )
    if(@employeeId is not null )
        return 'employee';
    
    set @enterpriseId = (
        select idEnterpriseClients
            from TBL_ENTERPRISE_CLIENTS
            where idUser = @userId
    )
    if(@enterpriseId is not null )
        return 'enterprise';

    set @individualId = (
        select idIndividualClients
            from TBL_INDIVIDUAL_CLIENTS
            where idUser = @userId
    )
    if(@individualId is not null )
        return 'individual';    

    return @role;
END; 