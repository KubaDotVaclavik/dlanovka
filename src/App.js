import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Login from './pages/Login'

const getUser = gql`
  {
    viewer {
      username
    }
  }
`

class App extends Component {
  render() {
    return (
      <Query query={getUser}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          if (data.viewer) {
            return data.viewer.username
          } else {
            return <Login />
          }
        }}
      </Query>
    )
  }
}

export default App
