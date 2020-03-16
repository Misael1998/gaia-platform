-- Insert rows into table '' in schema '[dbo]'
INSERT INTO [pyflor].[dbo].[TBL_BILLS]
( -- Columns to insert data into
 [emission_date],
 [idOrders],
 [idRequests],
 [num_bill]
)
VALUES
( 
 '2019-05-02',
 null,
 6,
 '1365'
),
( 
 '2013-01-10',
 null,
 7,
 '2836'
),
(
 '2009-05-02',
 null,
 8,
 '8354'
),
(
 '2004-09-05',
 null,
 9,
 '2364'
)
-- Add more rows here
GO