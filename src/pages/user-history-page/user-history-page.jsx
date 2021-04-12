import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUserHistory} from '../../redux/user/user.selectors';
import HistoryCard from '../../components/history-card/history-card';
import { Typography } from '@material-ui/core';

export const UserHistoryPage = ({props, userHistory}) => {
    return (
        <div className='cards'>
            {
            userHistory && userHistory.length > 0 ?
            userHistory.map( dataItem => (
                <HistoryCard key={dataItem.key} recipeData={dataItem} {...props} />
            )) : <Typography>There are no recipes added to history yet.</Typography>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    userHistory: selectCurrentUserHistory
  });
  
export default connect(mapStateToProps)(UserHistoryPage);
