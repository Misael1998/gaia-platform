-- Insert rows into table '' in schema '[dbo]'
INSERT INTO [pyflor].[dbo].[TBL_PRO_BILL]
( -- Columns to insert data into
 [idBills],
 [description],
 [maquila],
 [net_plant]
)
VALUES
( 
 10,
 'descripcion 1',
 45.8,
 60.9
),
( 
 12,
 'descripcion 2',
 89.9,
 45.7
)
-- Add more rows here
GO
