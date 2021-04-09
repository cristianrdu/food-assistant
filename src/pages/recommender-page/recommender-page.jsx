import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { fetchRecommenderQueryResults } from '../../redux/recommender/recommender.actions';
import { selectIngredFrequencyList } from '../../redux/user/user.selectors';
import { selectIsUpdated } from '../../redux/recommender/recommender.selectors';

import Grid from '@material-ui/core/Grid';

import RecipeList from '../../components/recommender-list/recommender-list';
import MealPlan from '../../components/meal-plan/meal-plan';
import SpinningLoader from '../../components/loader/loader';

const RecipeListLoader = SpinningLoader(RecipeList);


const RecommenderPage = ({frequencyList, fetchRecommenderQueryResults, isUpdated}) => {
    useEffect(() => {
        if (frequencyList) {
            fetchRecommenderQueryResults(frequencyList);
        }
    }, [fetchRecommenderQueryResults])
    
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    {frequencyList ? (
                        <h>Recommendations with your top {frequencyList.length} ingredients: {frequencyList}</h>
                    ): null}
                </Grid>
                <Grid item xs={12} sm={10}>
                    <RecipeListLoader isLoading={!isUpdated}/>
                    <MealPlan days={4}/>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    frequencyList: selectIngredFrequencyList,
    isUpdated: selectIsUpdated
  });

const mapDispatchToProps = dispatch => ({
    fetchRecommenderQueryResults: (queryParams) => dispatch(fetchRecommenderQueryResults(queryParams, dispatch))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(RecommenderPage);
