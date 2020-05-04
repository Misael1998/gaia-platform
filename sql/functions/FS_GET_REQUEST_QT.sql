IF OBJECT_ID (N'FS_GET_REQUEST_QT') IS NOT NULL  
    DROP FUNCTION FS_GET_REQUEST_QT;  
GO
create function FS_GET_REQUEST_QT()
returns INT
as
BEGIN
    DECLARE @qt int
    select @qt = count(idRequests) from TBL_REQUESTS
    RETURN @qt
END;
GO