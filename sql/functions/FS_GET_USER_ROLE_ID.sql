IF OBJECT_ID (N'dbo.getUserRole', N'FN') IS NOT NULL  
    DROP FUNCTION getUserRole;  
GO
CREATE FUNCTION [dbo].[getUserRoleID](@userId int)  
RETURNS INT
AS   
-- Returns the user role  
BEGIN
    declare @employeeId int = null;
    declare @enterpriseId int = null;
    declare @individualId int = null;
    declare @adminId int = null;

    set @employeeId = (
        select idEmployees
    from TBL_EMPLOYEES
    where idUser = @userId
    )
    if(@employeeId is not null )
        return @employeeId;

    set @enterpriseId = (
        select idEnterpriseClients
    from TBL_ENTERPRISE_CLIENTS
    where idUser = @userId
    )
    if(@enterpriseId is not null )
        return @enterpriseId;

    set @individualId = (
        select idIndividualClients
    from TBL_INDIVIDUAL_CLIENTS
    where idUser = @userId
    )
    if(@individualId is not null )
        return @individualId;

    set @adminId = (
        select idAdmin
    from TBL_ADMINS
    where idUser = @userId
    )
    if(@adminId is not null )
        return @adminId;

    return null
END;