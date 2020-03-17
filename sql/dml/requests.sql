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
 '2019-09-06 00:23:12',
 34.5,
 4,
 1,
 5,
 null
),
(
 2,
 '2018-01-04 02:54:46',
 46.5,
 3,
 2,
 6,
 null
),
(
 3,
 '2001-03-08 05:14:14',
 235.4,
 2,
 1,
 null,
 3
),
(
 4,
 '2001-04-05 10:34:34',
 78.9,
 1,
 2,
 null,
 4
)
-- Add more rows here
GO

