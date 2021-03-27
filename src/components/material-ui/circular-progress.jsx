import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex',
    '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    circular:{
        color:'#42850c'
    }
}));

export const CustomCircularProgress = () => {
    const classes = useStyles();
    return (
        <CircularProgress className={classes.circular}/>
    )
}
