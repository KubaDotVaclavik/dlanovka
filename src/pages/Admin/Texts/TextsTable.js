import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'

const getTexts = gql`
  {
    texts {
      id
      code
      text_cs
      text_en
      text_svk
      text_blr
      poznamka
    }
  }
`

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  panel: {
    padding: theme.spacing.unit * 2
  },
  table: {
    minWidth: 700
  },
  subtitle: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: '0.6em'
  }
})

const TextsTable = props => {
  const { classes, history } = props

  return (
    <Query query={getTexts} fetchPolicy="network-only">
      {({ loading, error, data, refetch }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        return (
          <div>
            <Typography variant="h2" gutterBottom>
              Admin
              <span className={classes.subtitle}> Texty </span>
            </Typography>

            <Paper className={classes.root}>
              <div className={classes.panel}>
                <Button
                  onClick={() => history.push('/admin/texts/create')}
                  variant="contained"
                  size="small"
                  color="primary"
                  className={classes.button}
                >
                  Nový
                </Button>
              </div>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Kód</TableCell>
                    <TableCell>Poznámka</TableCell>
                    <TableCell>CS</TableCell>
                    <TableCell>EN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.texts.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.poznamka}</TableCell>
                        <TableCell>{row.text_cs}</TableCell>
                        <TableCell>{row.text_en}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        )
      }}
    </Query>
  )
}

TextsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(TextsTable))
