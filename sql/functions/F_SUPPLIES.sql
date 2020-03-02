create function F_SUPPLIES()
returns TABLE
as
RETURN
    SELECT
        *
    FROM
        dbo.TBL_SUPPLIES
