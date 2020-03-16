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
 '12345097',
 '99104567',
 2,
 3,
 1
),
(
 'Wendys',
 'Maria Mendoza',
 'Negocio 2 ',
 '8326472',
 '33097854',
 3,
 2,
 3
),
(
 'Marriot',
 'Ana Molina',
 'Negocio 3',
 '3853824',
 '32095678',
 4,
 1,
 4
),
(
 'Pais',
 'Pedro Rodriguez',
 'Negocio 4',
 '932754',
 '98332011',
 1,
 3,
 2
)
-- Add more rows here
GO