import React, { useState } from 'react'
import AllTimeListContainer from '../recommender-lists/all-time-list-container';
import RecentsListContainer from '../recommender-lists/recents-list-container';
import TabPanel from '../material-ui/tab-panel';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const RecommenderTab = () => {
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
                <AllTimeListContainer/>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <RecentsListContainer/>
              </TabPanel>
        </div>
    )
}

export default RecommenderTab;

