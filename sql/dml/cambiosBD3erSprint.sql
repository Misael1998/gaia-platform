---CAMBIANDO de int a float el campo percentage en todas las tablas requeridas


-- Drop '[percentage]' from table '[tbl_reductions]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_reductions]
    DROP COLUMN [percentage]
GO

-- Add a new column '[percentage]' to table '[tbl_reductions]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_reductions]
    ADD [percentage] /*new_column_name*/ FLOAT /*new_column_datatype*/ not NULL /*new_column_nullability*/
GO
 

-- Drop '[percentage]' from table '[tbl_discounts]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_discounts]
    DROP COLUMN [percentage]
GO

-- Add a new column '[percentage]' to table '[tbl_discounts]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_discounts]
    ADD [percentage] /*new_column_name*/ FLOAT /*new_column_datatype*/ not NULL /*new_column_nullability*/
GO

-- Drop '[percentage]' from table '[tbl_taxes]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_taxes]
    DROP COLUMN [percentage]
GO

-- Add a new column '[percentage]' to table '[tbl_taxes]' in schema '[dbo]'
ALTER TABLE [dbo].[tbl_taxes]
    ADD [percentage] /*new_column_name*/ FLOAT /*new_column_datatype*/ not NULL /*new_column_nullability*/
GO

----AGREGANDO CAMPO idPaymentMethods en TBL_REQUESTS

 -- Add a new column '[idPaymentMethods]' to table '[tbl_requests]' in schema '[dbo]'
 ALTER TABLE [dbo].[tbl_requests]
     ADD [idPaymentMethods] /*new_column_name*/ int /*new_column_datatype*/ NULL /*new_column_nullability*/
 GO

 ALTER TABLE [dbo].[TBL_REQUESTS]  WITH CHECK ADD  CONSTRAINT [fk_TBL_REQUESTS_TBL_PAYMENT_METHODS1] FOREIGN KEY([idPaymentMethods])
REFERENCES [dbo].[TBL_PAYMENT_METHODS] ([idPaymentMethods])
GO

ALTER TABLE [dbo].[TBL_REQUESTS] CHECK CONSTRAINT [fk_TBL_REQUESTS_TBL_PAYMENT_METHODS1]
GO



--CAMBIAR el nombre de la tabla de order type a request type  
---y modificar a su nuevo nombre la llave foranea en tbl_request (idRequestType)

ALTER TABLE [dbo].[TBL_REQUESTS] DROP CONSTRAINT [fk_TBL_REQUESTS_TBL_ORDER_TYPES1]
GO

-- Drop '[idOrderType]' from table '[TBL_REQUESTS]' in schema '[dbo]'
ALTER TABLE [dbo].[TBL_REQUESTS]
    DROP COLUMN [idOrderType]
GO

-- Drop a table called 'TBL_ORDER_TYPE' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[TBL_ORDER_TYPES]', 'U') IS NOT NULL
DROP TABLE [dbo].[TBL_ORDER_TYPES]
GO

-- Create a new table called '[TBL_REQUEST_TYPES]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[TBL_REQUEST_TYPES]', 'U') IS NOT NULL
DROP TABLE [dbo].[TBL_REQUEST_TYPES]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[TBL_REQUEST_TYPES]
(
    [idRequestType] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [name] NVARCHAR(50) NOT NULL
    -- Specify more columns here
);
GO

-- Add a new column '[idRequestType]' to table '[TBL_REQUESTS]' in schema '[dbo]'
ALTER TABLE [dbo].[TBL_REQUESTS]
    ADD [idRequestType] /*new_column_name*/ INT /*new_column_datatype*/ not NULL /*new_column_nullability*/
GO

ALTER TABLE [dbo].[TBL_REQUESTS]  WITH CHECK ADD  CONSTRAINT [fk_TBL_REQUESTS_TBL_REQUEST_TYPES1] FOREIGN KEY([idRequestType])
REFERENCES [dbo].[TBL_REQUEST_TYPES] ([idRequestType])
GO

ALTER TABLE [dbo].[TBL_REQUESTS] CHECK CONSTRAINT [fk_TBL_REQUESTS_TBL_REQUEST_TYPES1]


