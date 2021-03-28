import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUserHistory} from '../../redux/user/user.selectors';
import HistoryCard from '../../components/history-card/history-card';

export const UserHistoryPage = ({props, userHistory}) => {
    return (
        <div className='cards'>
            {
            userHistory ?
            userHistory.map( dataItem => (
                <HistoryCard key={dataItem.key} recipeData={dataItem} {...props} />
            )) : null
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    userHistory: selectCurrentUserHistory
  });
  
export default connect(mapStateToProps)(UserHistoryPage);
