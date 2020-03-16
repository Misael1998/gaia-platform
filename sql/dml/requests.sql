-- Insert rows into table '' in schema '[dbo]'
INSERT INTO [pyflor].[dbo].[TBL_REQUESTS]
( -- Columns to insert data into
 [idDeliveryType],
 [emission_date],
 [shipping],
 [idRequestType],
 [idPaymentMethods],
 [idEnterpriseClient],
 [idIndividualClient]
)
VALUES
( 
 1,
 '2010-09-10 13:14:56',
 100.3,
 4,
 1,
 null,
 1
),
( 
 3,
 '2009-05-12 09:30:24',
 99.2,
 2,
 2,
 1,
 null
),
(
 2,
 '2012-12-11 15:23:06',
 80.50,
 1,
 1,
 2,
 null
),
(
 4,
 '2019-01-12 14:56:23',
 95.9,
 3,
 2,
 3,
 null
)
-- Add more rows here
GO