import {AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    CssBaseline,
    Tabs,
    Tab,
    useScrollTrigger
  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import CssBaseline from '@material-ui/core/CssBaseline';

import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../data/firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
    
const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 2,
  });
}

const useStyles = makeStyles((theme) => ({
  header: {
    color: 'black',
    paddingRight: '79px',
    paddingLeft: '20px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
      height: '7em',
  },
  drawerContainer: {
    padding: '20px 30px'
  },
  toolbarMargin:{
      ...theme.mixins.toolbar
    },
  tabContainer:{
      marginLeft:'auto'
  },
  tab: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 700,
      size: '18px',
      minWidth: 10,
      marginLeft: '25px'
  }
}));

export const Header = ({currentUser}) => {
  const { header, logo, drawerContainer, tabContainer, tab, toolbarMargin } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
  return (
    <Toolbar disableGutters>
      <Link component={RouterLink} to ='/'>
        <Logo className={logo} />
      </Link>
      <Tabs  className={tabContainer} indicatorColor='white'>
        <Tab className={tab} component={RouterLink} to='/recipes/all' label='Recipes'/>
        {currentUser ? (
          <React.Fragment>
            <Tab className={tab} component={RouterLink} to='/recipe-history' label='HISTORY'/>
            <Tab className={tab} component={RouterLink} to='/suggestions' label='SUGGESTIONS'/>
            <div onClick={() => auth.signOut()}>
              <Tab className={tab} label = 'SIGN OUT'/>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tab className={tab} component={RouterLink} to='/sign-in' label='Sign In'/>
            <Tab className={tab} component={RouterLink} to='/sign-up' label='Sign Up'/>
          </React.Fragment>
        )}
      </Tabs>
    </Toolbar>
  );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton edge= 'start' color= 'inherit' onClick= {handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor = 'left' open = {drawerOpen} onClose = {handleDrawerClose}>
          <div className={drawerContainer}>
            <Link component= {RouterLink} to= '/recipes/all' color= 'inherit' key= 'Recipes'>
              <MenuItem>RECIPES</MenuItem>
            </Link>
            {
              currentUser ? (
              <React.Fragment>
                <Link component= {RouterLink} to= '/recipe-history' color= 'inherit' key= 'History'>
                  <MenuItem>HISTORY</MenuItem>
                </Link>
                <Link component= {RouterLink} to= '/suggestions' color= 'inherit' key= 'Suggestions'>
                  <MenuItem>SUGGESTIONS</MenuItem>
                </Link>
                <Link component= {RouterLink} color= 'inherit' key= 'Sign Out'>
                  <div onClick={() => {auth.signOut(); handleDrawerClose();}}>
                    <MenuItem>SIGN OUT</MenuItem>
                  </div>
                </Link>
              </React.Fragment>
              ):(
              <React.Fragment>
                <Link component= {RouterLink} to= '/sign-in' color= 'inherit' key= 'Sign In'>
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
                <Link component= {RouterLink} to= '/sign-up' color= 'inherit' key= 'Sign Up'>
                  <MenuItem>SIGN UP</MenuItem>
                </Link>
              </React.Fragment>
              )
            }
          </div>
        </Drawer>
        <Link component={RouterLink} to ='/'>
          <Logo className={logo} />
        </Link>
      </Toolbar>
    );
  };
  
  return (
  <React.Fragment>
    <CssBaseline />
    <ElevationScroll>
      <AppBar className={header} position='fixed' color='white'>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </ElevationScroll>    
    <Toolbar />
    <div className={toolbarMargin}/>
  </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);