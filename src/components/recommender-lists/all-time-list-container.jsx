import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectAllTimeUpdated } from '../../redux/recommender/recommender.selectors';
import SpinningLoader from '../loader/loader';

import AllTimeList from './all-time-list';

const mapStateToProps = createStructuredSelector({ 
    isLoading: state => !selectAllTimeUpdated(state),
})

const AllTimeListContainer = compose(
    connect(mapStateToProps),
    SpinningLoader
)(AllTimeList);

export default AllTimeListContainer;