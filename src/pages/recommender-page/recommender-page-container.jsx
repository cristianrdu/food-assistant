import { compose } from 'redux';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { setMealPlan } from '../../redux/user/user.actions';
import { selectHistoryFrequencyList, selectIngredFrequencyList, selectNrDaysMealPlan, selectMealPlanFetched } from '../../redux/user/user.selectors';
import { fetchAllTimeSearchResults, fetchRecentsSearchResults } from '../../redux/recommender/recommender.actions';


import RecommenderPage from './recommender-page';



const mapStateToProps = createStructuredSelector({
    frequencyList: selectIngredFrequencyList,
    historyFrequencyList: selectHistoryFrequencyList,
    mealPlanFetched: selectMealPlanFetched,
    nrDaysMealPlan: selectNrDaysMealPlan
  });
  
  const mapDispatchToProps = dispatch => ({
    setMealPlan: (days) => dispatch(setMealPlan(days, dispatch)),
    fetchAllTimeSearchResults: (queryParams) => dispatch(fetchAllTimeSearchResults(queryParams, dispatch)),
    fetchRecentsSearchResults: (queryParams) => dispatch(fetchRecentsSearchResults(queryParams, dispatch))
  });
  

const RecommenderPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(RecommenderPage);

export default RecommenderPageContainer;