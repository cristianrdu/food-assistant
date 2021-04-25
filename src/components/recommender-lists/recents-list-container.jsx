import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectRecentsUpdated } from '../../redux/recommender/recommender.selectors';
import SpinningLoader from '../loader/loader';

import RecentsList from './recents-list';

const mapStateToProps = createStructuredSelector({ 
    isLoading: state => !selectRecentsUpdated(state),
})

const RecentsListContainer = compose(
    connect(mapStateToProps),
    SpinningLoader
)(RecentsList);

export default RecentsListContainer;