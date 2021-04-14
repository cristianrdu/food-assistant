import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUserHistory} from '../../redux/user/user.selectors';

import HistoryCard from '../../components/history-card/history-card';

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}));

export const UserHistoryPage = ({userHistory}) => {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            {
            userHistory && userHistory.length > 0 ?
            <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                {userHistory.map(historyRecipe => (
                    <Grid item xs={12} sm={6} md={3} key={userHistory.indexOf(historyRecipe)}>
                        <HistoryCard key={historyRecipe.key} recipeData={historyRecipe} />
                    </Grid>
                ))}
            </Grid>
            : <Typography>There are no recipes added to history yet.</Typography>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    userHistory: selectCurrentUserHistory
  });
  
export default connect(mapStateToProps)(UserHistoryPage);
