-- SELECT emp."firstName" as EmployerName, mgr."firstName" as ManagerName
-- FROM category  emp
-- INNER JOIN category as Mgr 
-- ON emp."parentId" = mgr.id;
-- Where "category_closure.id_ancestor" = '4419d5ae-5882-4c76-aace-2beb7f04fc42';

-- select * from category;

WITH EmpMgrCTE
as 
(SELECT "firstName", "lastName", 0 as EmployeeLevel
from category
where "parentId" is NULL
UNION ALL
SELECT emp."id", emp."firstName", emp."parentId",  mgr.EmployeeLevel + 1 as EmployeeLevel
from category emp
INNER JOIN category as mgr
ON emp."parentId" = mgr.id
)
SELECT * from EmpMgrCTE
order by EmployeeLevel