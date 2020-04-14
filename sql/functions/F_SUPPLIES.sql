IF OBJECT_ID (N'F_SUPPLIES', N'IF') IS NOT NULL  
    DROP FUNCTION F_SUPPLIES;  
GO
create function F_SUPPLIES()
returns TABLE
as
RETURN
    SELECT
    s.idSupplies as id,
    s.[name],
    s.[type],
    s.unit_price as unitPrice,
    st.[description] as sarType
FROM
    dbo.TBL_SUPPLIES as s
    INNER JOIN TBL_SAR_TYPES as st
    ON st.idSarTypes = s.TBL_SAR_TYPES_idSarTypes
GO
