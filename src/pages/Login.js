import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  textfieldWrapper: {
    marginTop: theme.spacing.unit * 2,
    display: 'block'
  },
  button: {
    marginTop: theme.spacing.unit * 3
  }
})

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false
  }

  login = () => {
    const { username, password } = this.state
    fetch('/api/login', {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        window.location.reload()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  render() {
    const { classes } = this.props
    const { username, password, showPassword } = this.state
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Dlaňovka
            </Typography>
            <div className={classes.textfieldWrapper}>
              <TextField
                fullWidth={true}
                label="Username"
                value={username}
                onChange={this.handleChange('username')}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div className={classes.textfieldWrapper}>
              <TextField
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                label="Heslo"
                value={password}
                onChange={this.handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.login}
            >
              Přihlásit
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Login)
