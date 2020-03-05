-- Create a new table called '[TBL_FORGOT_PASSWORD_TOKENS]' in schema '[pyflor].[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[pyflor].[dbo].[TBL_FORGOT_PASSWORD_TOKENS]', 'U') IS NOT NULL
DROP TABLE [pyflor].[dbo].[TBL_FORGOT_PASSWORD_TOKENS]
GO
-- Create the table in the specified schema
CREATE TABLE [pyflor].[dbo].[TBL_FORGOT_PASSWORD_TOKENS]
(
    [idTokens] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [token] VARCHAR(MAX) NOT NULL,
    [tokenExpire] DATETIME NOT NULL,
    [idUser] INT NOT NULL
    CONSTRAINT [fk_TBL_FORGOT_PASSWORD_TOKENS] 
    FOREIGN KEY([idUser])
    REFERENCES [pyflor].[dbo].[TBL_USERS] ([idUser])
);
GO