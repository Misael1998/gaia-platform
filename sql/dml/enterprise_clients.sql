-- Insert rows into table 'TBL_COMPANY_TYPE' in schema '[dbo]'
INSERT INTO [pyflor].[dbo].[TBL_ENTERPRISE_CLIENTS]
( 
 [company_name],
 [contact_name],
 [business_name],
 [RTN],
 [contact_number],
 [idUser],
 [idCompanyType],
 [idSector]
)
VALUES
( 
 'La Colonia',
 'Juan Perez',
 'Negocio 1',
 '123745097',
 '99894567',
 5,
 3,
 1
),
(
 'Wendys',
 'Maria Mendoza',
 'Negocio 2 ',
 '83278872',
 '33009854',
 6,
 2,
 3
)
-- Add more rows here
GO

