# stagewood
Next.js, Prisma GraphQL, Apollo Server, Yoga Graphql

Authentication 

# To start 
1. Clone repo 
2. cd Backend  - npm install ; npm run dev
3. cd Frontend - npm install ; npm run dev



## Deployed: 
  * Link to frontend : https://stagewood-next-prod.herokuapp.com/
  * Link to backend: https://stagewood-next-prod.herokuapp.com/
  * dev endpoint "https://eu1.prisma.sh/johan-gace-9a9a1d/stagewood/dev"


## Technologies
- Prisma:
   Provides a set of GraphQql CRUD apis for MySql Database. 
   Schema definition
   Self hosted
   Data relationships
   Querried from Yoga Server

   Interact with prisma: 
    -prisma login
    - prisma init
    - prisma console
    npm run deploy --- prisma deploy --env-file variables.env
 
        Prsima Graphql Actions
          - mutation {
          createUser(data: {
              name: " Johan Gace"
              email: "johangace@something.com"
              image:"asjfasjhdskh"
              password:"asjhfsj"
          }){
              name
              email
              password image
          }
          }
          - query {
          users(where:{
              name_contains: "johan"
          }){
              id
              name
          }
          }


- GraphQL Yoga  
  An Exprpress Graphql Server for : 
    Implement Query and mutation resolvers
    custom Server Side logic
    Performing JWT authentication 
    Check Permissions   


- cookies- JWT.IO

- Apollo Client
  Data management
    Fetch Queries
    Perform the mutations 
    Cache Graphql data 
    Loading Ui states




Steps to add  a piece of data to backend:

1.datamodel.Graphql  -- schema for prisma
   create type
2. npm run deploy --prisma
3.prisma.graphql : all methods to datamodel 

4.schema.graphql - public facing api
 createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!

5.(yoga server connects with the prisma (prisma.graphql) db)
        Mutation : 
       async createItem(parent, args, context, info ){
        const item = context.db.mutation.createUser( data :{
            ...args
        }, info}}
        )
        return item
        }


## deploy
1.Prisma server

2.yoga server
3.react



