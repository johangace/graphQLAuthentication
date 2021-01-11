//expose apollo
import withApollo from 'next-with-apollo'
//package by apollo  preconfig caching , ajax calls, local state etc
import ApolloClient from 'apollo-boost'
import { endpoint } from '../config'

//header for authentication
function createClient({ headers }) {
  return new ApolloClient({
    uri: endpoint,
    // process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)
