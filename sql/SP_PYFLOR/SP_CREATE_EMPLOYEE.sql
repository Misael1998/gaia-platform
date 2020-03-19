USE pyflor
GO
-- Create a new stored procedure called 'SP_CREATE_EMPLOYEE' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'SP_CREATE_EMPLOYEE'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.SP_CREATE_EMPLOYEE
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.SP_CREATE_EMPLOYEE
    @name VARCHAR(45),
    @lastName VARCHAR(45),
    @address VARCHAR(150),
    @phone VARCHAR(12),
    @email VARCHAR(100),
    @password VARCHAR(100),
    @jobTitle INT,
    @department INT,
    @admissionDate DATE,
    @admin INT,
    @msj VARCHAR(50) OUTPUT,
    @err VARCHAR(50) OUTPUT
AS
declare @userId TABLE (id int)
declare @adminId INT
declare @tmpJobTitle INT = 0
DECLARE @tmpDepartment INT = 0

if @jobTitle is null
    BEGIN
    set @msj = 'error'
    set @err = 'job title field cant be empty'
    return 0
END

set @tmpJobTitle = (
        select count(idJobTitle)
from [pyflor].[dbo].[TBL_JOB_TITLES]
WHERE idJobTitle = @jobTitle
    )

IF @tmpJobTitle = 0
    BEGIN
    set @msj = 'error'
    set @err = 'invalid value for job title id'
    return 0
END

if @department is null
    BEGIN
    set @msj = 'error'
    set @err = 'department field cant be empty'
    return 0
END

set @tmpDepartment = (
        select count(idDepartments)
from [pyflor].[dbo].[TBL_DEPARTMENTS]
WHERE idDepartments = @department
    )

IF @tmpDepartment = 0
    BEGIN
    set @msj = 'error'
    set @err = 'invalid value for department id'
    return 0
END

if @name is null or @name = ''
    BEGIN
    set @msj = 'error'
    set @err = 'name field cant be empty'
    return 0
END

if @address is null or @address = ''
    BEGIN
    set @msj = 'error'
    set @err = 'address field cant be empty'
    return 0
END

if @phone is null or @phone = ''
    BEGIN
    set @msj = 'error'
    set @err = 'phone field cant be empty'
    return 0
END

if @email is null or @email = ''
    BEGIN
    set @msj = 'error'
    set @err = 'email field cant be empty'
    return 0
END

if @password is null or @password = ''
    BEGIN
    set @msj = 'error'
    set @err = 'password field cant be empty'
    return 0
END

if @admin is null
    BEGIN
    set @msj = 'error'
    set @err = 'admin field cant be empty'
    return 0
END

if @admissionDate is null or @admissionDate = ''
    BEGIN
    set @msj = 'error'
    set @err = 'admission date field cant be empty'
    return 0
END

set @adminId = (
        select idAdmin
from [pyflor].[dbo].[TBL_ADMINS]
where idUser = @admin
    )

INSERT INTO [pyflor].[dbo].[TBL_USERS]
    (
    email,
    password,
    phone,
    address,
    name,
    lastname
    )
OUTPUT inserted.idUser into @userId
VALUES(
        @email,
        @password,
        @phone,
        @address,
        @name,
        @lastName 
    )

INSERT INTO [pyflor].[dbo].[TBL_EMPLOYEES]
    (
    admission_date,
    idUser,
    idDepartments,
    idJobTitle,
    idAdmin
    )
VALUES(
        @admissionDate,
        (select id
        from @userId),
        @department,
        @jobTitle,
        @adminId
    )

set @msj = 'success'
set @err = 'none'

RETURN 1
GO
-- example to execute the stored procedure we just created
-- EXECUTE dbo.SP_CREATE_EMPLOYEE 1 /*value_for_param1*/, 2 /*value_for_param2*/
-- GO