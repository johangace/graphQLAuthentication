require('dotenv').config({ path: 'variables.env' })
const cookieParser = require('cookie-parser')
const createServer = require('./createServer')
const db = require('./db')
const jwt = require('jsonwebtoken')

const server = createServer()

//express middleware to handle cookies (JWT)
server.express.use(cookieParser())

//decode the jwt so we get  user ID on request
server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // userId onto the req for future requests to access
    req.userId = userId
  }
  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
      // 'http://localhost:7777',
    },
  },
  (deets) => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`)
  },
)
