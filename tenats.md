A tenant is a group of users who share a common access with specific privileges to the software instance.

A single-tenant app has 1 tenant (and 1 database possibly) in the Node.js app. So each user in the system needs a new Node.js app.

A multi-tenant app has multiple tenants in the Node.js app. There are 2 models of multi-tenant systems. 

1) In the instance replication model, the system spins a new instance for every tenant. This is easier to start, but hard to scale. It becomes a nightmare when 100s of tenants signup.

2) 


