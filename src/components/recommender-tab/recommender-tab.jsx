import React, { useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectAllTimeUpdated, selectRecentsUpdated } from '../../redux/recommender/recommender.selectors';

import AllTimeList from '../recommender-lists/all-time-list';
import RecentsList from '../recommender-lists/recents-list';
import SpinningLoader from '../loader/loader';
import TabPanel from '../material-ui/tab-panel';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AllTimeListLoader = SpinningLoader(AllTimeList);
const RecentsListLoader = SpinningLoader(RecentsList);

const RecommenderTab = ({allTimeUpdated, recentsUpdated}) => {
    const [currentTab, setCurrentTab] = useState(0);

    const changeCurrentTab = (event, newValue) => {
      setCurrentTab(newValue);
    };

    return (
        <div>
            <Tabs textColor="secondary" value={currentTab} variant="scrollable" onChange={changeCurrentTab}>
                <Tab label="All-time top ingredients" id = 'tab-All Time Ingredients'/>
                <Tab label="Recently used ingredients" id = 'tab-Recent Ingredients' />
              </Tabs>
              <TabPanel value={currentTab} index={0}>
                <AllTimeListLoader isLoading={!allTimeUpdated}/>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <RecentsListLoader isLoading={!recentsUpdated}/>
              </TabPanel>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  allTimeUpdated: selectAllTimeUpdated,
  recentsUpdated: selectRecentsUpdated,
});


export default connect(mapStateToProps, null)(RecommenderTab);

