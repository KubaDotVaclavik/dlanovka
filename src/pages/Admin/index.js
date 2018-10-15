import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import TextsTable from './Texts/TextsTable'
import TextCreate from './Texts/TextCreate'
import Button from '@material-ui/core/Button'

const Index = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Admin
    </Typography>
    <Button
      variant="outlined"
      color="primary"
      to="/admin/texts"
      component={Link}
    >
      Texty
    </Button>
  </div>
)

export default () => {
  return (
    <div>
      {/* <Button
        variant="outlined"
        color="primary"
        to="/admin/texts"
        component={Link}
      >
        Texty
      </Button> */}
      <Switch>
        <Route exact path="/admin" component={Index} />
        <Route exact path="/admin/texts" component={TextsTable} />
        <Route path="/admin/texts/create" component={TextCreate} />
      </Switch>
    </div>
  )
}
