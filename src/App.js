import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Login from './pages/Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin/index'
import Layout from './components/Layout'
import Navigation from './components/Navigation'

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
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          if (data.viewer) {
            return (
              <Layout navigation={<Navigation />}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/admin" component={Admin} />
                  <Redirect to="/" />
                </Switch>
              </Layout>
            )
          } else {
            return <Login onLoginUpdate={refetch} />
          }
        }}
      </Query>
    )
  }
}

export default App
