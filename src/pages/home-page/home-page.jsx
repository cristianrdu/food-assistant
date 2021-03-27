import React from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectSearchIsOn, selectIsUpdating } from '../../redux/search/search.selectors';

import Directory from '../../components/directory/directory';
import SearchBox from '../../components/search-box/search-box';
import SpinningLoader from '../../components/loader/loader';
import SearchList from '../../components/search-list/search-list';

import './home-page.css';


const SearchListLoader = SpinningLoader(SearchList);

const HomePage = ({searchIsOn, isUpdated}) => {
    return (
        <div className='homepage'>
            <SearchBox/>
            {
                searchIsOn ?
                (<SearchListLoader isLoading={!isUpdated}/>)
                :
                (<Directory/>)
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    searchIsOn: selectSearchIsOn,
    isUpdated: selectIsUpdating
  });
  
export default connect(mapStateToProps)(HomePage);
