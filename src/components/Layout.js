import { fade } from '@material-ui/core/styles/colorManipulator'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import classnames from 'classnames'
import gql from 'graphql-tag'
import IconButton from '@material-ui/core/IconButton'
import IconHome from '@material-ui/icons/Home'
import IconDashboard from '@material-ui/icons/Dashboard'
import InputBase from '@material-ui/core/InputBase'
import MailIcon from '@material-ui/icons/Mail'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import cyan from '@material-ui/core/colors/cyan'
import Popover from '@material-ui/core/Popover'
import { Link, withRouter } from 'react-router-dom'

const getUser = gql`
  {
    viewer {
      username
    }
  }
`

const drawerWidth = 240

const styles = theme => ({
  root: {
    paddingTop: 48,
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  toolbarButton: {
    color: cyan[700],
    marginLeft: -12,
    marginRight: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  navigationMenuRoot: {
    position: 'fixed',
    height: 'calc(100vh - 60px)',
    minWidth: 200,
    padding: theme.spacing.unit
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.root = React.createRef()
  }

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    navigationAnchorEl: null
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  handleNavigationMenuOpen = e => {
    this.setState({ navigationAnchorEl: this.root.current })
  }
  handleNavigationMenuClose = () => {
    this.setState({ navigationAnchorEl: null })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, navigationAnchorEl } = this.state
    const { classes, history } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isNavigationMenuOpen = Boolean(navigationAnchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    )

    const renderNavigationMenu = (
      <Popover
        marginThreshold={3}
        anchorReference={'anchorPosition'}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        anchorPosition={{ top: 51, left: 3 }}
        classes={{ paper: classes.navigationMenuRoot }}
        anchorEl={navigationAnchorEl}
        open={isNavigationMenuOpen}
        onClose={this.handleNavigationMenuClose}
      >
        {this.props.navigation}
      </Popover>
    )
    // const renderNavigationMenu = (
    //   <Menu
    //     anchorEl={navigationAnchorEl}
    //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //     open={isNavigationMenuOpen}
    //     onClose={this.handleNavigationMenuClose}
    //   >
    //     <MenuItem onClick={() => history.push('/')}>Home</MenuItem>
    //     <MenuItem onClick={() => history.push('/admin')}>Admin</MenuItem>
    //   </Menu>
    // )

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={4}
              color="secondary"
            >
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={11}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )
    return (
      <Query query={getUser}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          if (data.viewer) {
            return (
              <div className={classes.root} ref={this.root}>
                <AppBar classes={{ root: classes.appBar }} position="fixed">
                  <Toolbar variant="dense">
                    <Link to="/">
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.toolbarButton}
                      >
                        <IconHome />
                      </Button>
                    </Link>
                    <Button
                      size="large"
                      variant="outlined"
                      color="primary"
                      className={classes.toolbarButton}
                      onClick={this.handleNavigationMenuOpen}
                    >
                      <IconDashboard className={classes.leftIcon} />
                      Sekce
                    </Button>
                    <Typography
                      className={classes.title}
                      variant="h6"
                      color="inherit"
                      noWrap
                    >
                      Dlaňovak
                    </Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                      />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                      <IconButton color="inherit">
                        <Badge
                          className={classes.margin}
                          badgeContent={4}
                          color="secondary"
                        >
                          <MailIcon />
                        </Badge>
                      </IconButton>
                      <IconButton color="inherit">
                        <Badge
                          className={classes.margin}
                          badgeContent={17}
                          color="secondary"
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-haspopup="true"
                        onClick={this.handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                  </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
                {renderNavigationMenu}
                {/* <Drawer
                  variant="permanent"
                  classes={{
                    paper: classes.drawerPaper
                  }}
                >
                  <Navigation />
                </Drawer> */}
                <main className={classes.content}>{this.props.children}</main>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default withRouter(withStyles(styles)(Layout))
