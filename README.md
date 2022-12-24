# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

Todo
- [x] Seed Project with Dummy Data
- [x] Query all Projects of a user
- [x] Single Project Page 
- [x] CRUD on Project


## Operations on Prisma Model based on more than just unique id
- In our case, for `Project` all operations on it depend on `Project id` as well as `client id` of its creator.
- Hence, in its [Schema](prisma/schema.prisma), we make `clientId + projectId` unique which creates a unique compound field `id_clientId` using which we can query/mutate Project.