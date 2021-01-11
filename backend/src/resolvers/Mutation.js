const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase()

    if (args.password.length <= 5) {
      throw new Error('Password should be minimum 6 characters. ')
    }

    // hash password  || 'SALT" to make it unique
    const password = await bcrypt.hash(args.password, 10)

    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          //email, name
          ...args,
          password,
        },
      },
      //so it knows what data to return to client
      info,
    )
    // create the JWT token for user
    const token = jwt.sign(
      { userId: user.id },

      process.env.APP_SECRET,
    )
    //  set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    })

    return user
  },
  async signin(parent, { email, password }, ctx, info) {
    //  check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No user found for email ${email}`)
    }
    // Check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    //  generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    //  Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    //  Return the user
    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye!' }
  },
}

module.exports = Mutations
