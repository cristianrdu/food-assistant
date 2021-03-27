import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../data/firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { makeStyles } from '@material-ui/core/styles';



function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin:{
    ...theme.mixins.toolbar
  },
  logo: {    
    height: '7em',
    // width: '70px',
    paddingLeft: '10px',
    // marginBottom: '10px'
  },
  appBar: {
    color: 'white'
  },
  tabContainer:{
    marginLeft:'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  }
}))

export const Header = ({currentUser}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  
  const handleChange = (e, value) => {
    setValue(value)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position='fixed' color='appBar'>
          <Toolbar disableGutters>
            <Link to ='/'>
              <Logo className={classes.logo} />
            </Link>
           <Tabs value={value} onChange = {handleChange} className={classes.tabContainer} indicatorColor='white'>
             <Tab className={classes.tab} component={Link} to='/recipes/all' label="Recipes"/>
             {currentUser ? 
            (<React.Fragment>
             <Tab className={classes.tab} component={Link} to='/user-history' label="RECIPE HISTORY"/>
              <div onClick={() => auth.signOut()}>
                <Tab className={classes.tab} label = 'SIGN OUT'/>
              </div>
            </React.Fragment>
            ) : (
            <React.Fragment>
             <Tab className={classes.tab} component={Link} to='/sign-in' label="Sign In"/>
             <Tab className={classes.tab} component={Link} to='/sign-up' label="Sign Up"/>
            </React.Fragment>
          )}
           </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <div className={classes.toolbarMargin}/>
    </React.Fragment>

  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);