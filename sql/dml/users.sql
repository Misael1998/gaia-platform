-- Insert rows into table '' in schema '[dbo]'
INSERT INTO [pyflor].[dbo].[TBL_USERS]
( -- Columns to insert data into
 [email], [password], [phone], [address], [name], [lastname]
)
VALUES
(
 'sjmr_12@yahoo.com',
 '$2a$10$shxmvShfLdt381s.mGI6cedZ6CQblMHGhwYGURl7v77TlFdUip0JC',
 '94390554',
 'Valle de Angeles',
 'Sergio Edgardo',
 'Marquez Flores'
),
(
 'dnelsonponce@gmail.com',
 '$2a$10$shxmvShfLdt381s.mGI6cedZ6CQblMHGhwYGURl7v77TlFdUip0JC',
 '98558854',
 'Aldea Zarabanda, km 11 antes de Pupusas al paso',
 'Nelson Damián',
 'Ponce Montúfar'
),
(
 'ksamariapo@gmail.com',
 '$2a$10$shxmvShfLdt381s.mGI6cedZ6CQblMHGhwYGURl7v77TlFdUip0JC',
 '98577128',
 'Valle de Angeles',
 'Keila Samaria',
 'Pineda Ochoa'
),
(
 'walexiss@gmail.com',
 '$2a$10$shxmvShfLdt381s.mGI6cedZ6CQblMHGhwYGURl7v77TlFdUip0JC',
 '94390557',
 'Valle de Angeles',
 'Wilson Alexis',
 'Salgado Salgado'
)
-- Add more rows here
GO