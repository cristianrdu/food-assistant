import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectIngredFrequencyList, selectHistoryFrequencyList } from '../../redux/user/user.selectors';
import { selectAllTimeUpdated, selectRecentsUpdated } from '../../redux/recommender/recommender.selectors';

import AllTimeList from '../recommender-lists/all-time-list';
import RecentsList from '../recommender-lists/recents-list';
import SpinningLoader from '../loader/loader';


import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  };

const AllTimeListLoader = SpinningLoader(AllTimeList);
const RecentsListLoader = SpinningLoader(RecentsList);

const RecommenderTab = ({frequencyList, allTimeUpdated, historyFrequencyList, recentsUpdated}) => {
    const [currentTab, setCurrentTab] = useState(0);

    const changeCurrentTab = (event, newValue) => {
      setCurrentTab(newValue);
    };

    return (
        <div>
            <Tabs textColor="secondary" value={currentTab} onChange={changeCurrentTab}>
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
  frequencyList: selectIngredFrequencyList,
  allTimeUpdated: selectAllTimeUpdated,
  recentsUpdated: selectRecentsUpdated,
  historyFrequencyList: selectHistoryFrequencyList
});


export default connect(mapStateToProps, null)(RecommenderTab);

