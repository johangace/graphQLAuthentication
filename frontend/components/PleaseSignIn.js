import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Signin from './Signin'
import Columns from '../components/styles/Columns'

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return (
          <Columns>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </Columns>
        )
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignIn
