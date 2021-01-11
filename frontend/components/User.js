import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      password
      image
    }
  }
`

const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {/* //pass the payload to children */}
    {(payload) => console.log(payload) || props.children(payload)}
  </Query>
)

export default User
export { CURRENT_USER_QUERY }
