import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const createText = gql`
  mutation($input: TextCreateInput) {
    textCreate(input: $input) {
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
  subtitle: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: '0.6em'
  }
})

class TextCreate extends React.Component {
  state = {
    data: {}
  }
  handleChange = field => e => {
    this.setState({
      data: { ...this.state.data, [field]: e.target.value }
    })
  }
  render() {
    const { classes, history } = this.props
    const { data } = this.state

    return (
      <Mutation
        mutation={createText}
        variables={{ input: data }}
        onCompleted={() => history.push('/admin/texts')}
      >
        {(createText, { loading, error, refetch }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return (
            <div>
              <Typography variant="h2" gutterBottom>
                Admin
                <span className={classes.subtitle}> Nový text </span>
              </Typography>

              <Card className={classes.root}>
                <CardContent>
                  <TextField
                    label="Kód"
                    className={classes.textField}
                    value={data.code || ''}
                    onChange={this.handleChange('code')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="poznamka"
                    className={classes.textField}
                    value={data.poznamka || ''}
                    onChange={this.handleChange('poznamka')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="text_cs"
                    className={classes.textField}
                    value={data.text_cs || ''}
                    onChange={this.handleChange('text_cs')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="text_en"
                    className={classes.textField}
                    value={data.text_en || ''}
                    onChange={this.handleChange('text_en')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="text_svk"
                    className={classes.textField}
                    value={data.text_svk || ''}
                    onChange={this.handleChange('text_svk')}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="text_blr"
                    className={classes.textField}
                    value={data.text_blr || ''}
                    onChange={this.handleChange('text_blr')}
                    margin="normal"
                    variant="outlined"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    onClick={createText}
                    variant="contained"
                    color="primary"
                  >
                    Uložit
                  </Button>
                </CardActions>
              </Card>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(withStyles(styles)(TextCreate))
