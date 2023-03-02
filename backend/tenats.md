# Define tenant.

A tenant is a group of users who share a common access with specific privileges to the software instance.

# Definition and types of tenant management at app level.

A single-tenant app has 1 tenant (and 1 database possibly) in the Node.js app. So each user in the system needs a new Node.js app.

# Types of multi-tenant model.

A multi-tenant app has multiple tenants in the Node.js app. There are 2 models of multi-tenant systems. 

1) In the instance replication model, the system spins a new instance for every tenant. This is easier to start, but hard to scale. It becomes a nightmare when 100s of tenants signup.

2) In the data-segregation model, the application is shared between tenants but data of each tenant is stored in separate data stores. Separate data stores could be separate databases or separate schema within the same database.

## Types of multi-tenant app in data-segregation model.

Data Segregation is of two types

One DB with different schemas/ tables for each tenant.
One DB for each tenant.



