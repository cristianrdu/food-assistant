import { compose } from 'redux';
import { connect } from 'react-redux';

import { fetchSearchQueryResults, setSearchToOff } from '../../redux/search/search.actions';


import AutoComplete from './auto-complete';


const mapDispatchToProps = dispatch => ({
    fetchSearchQueryResults: (queryParams) => dispatch(fetchSearchQueryResults(queryParams, dispatch)),
    setSearchToOff: () => dispatch(setSearchToOff(dispatch))
  });
  

const AutoCompleteContainer = compose(
    connect(null, mapDispatchToProps),
)(AutoComplete);

export default AutoCompleteContainer;