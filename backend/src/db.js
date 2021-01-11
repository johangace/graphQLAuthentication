const { Prisma } = require('prisma-binding')
//connects to remote prisma db and gives ability to query
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,

  secret: process.env.PRISMA_SECRET,

  debug: false,
})

module.exports = db
