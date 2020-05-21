IF OBJECT_ID (N'dbo.getUserRole') IS NOT NULL  
    DROP FUNCTION getUserRole;  
GO
CREATE FUNCTION [dbo].[getUserRole](@userId int)  
RETURNS varchar(10)
AS   
-- Returns the user role  
BEGIN
    declare @employeeId int = null;
    declare @enterpriseId int = null;
    declare @individualId int = null;
    declare @adminId int = null;

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

    set @adminId = (
        select idAdmin
    from TBL_ADMINS
    where idUser = @userId
    )
    if(@adminId is not null )
        return 'admin';

    return @role;
END; 
GO