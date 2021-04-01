import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { fetchRecommenderQueryResults } from '../../redux/recommender/recommender.actions';
import { selectIngredFrequencyList } from '../../redux/user/user.selectors';
import { selectIsUpdated } from '../../redux/recommender/recommender.selectors';

import RecipeList from '../../components/recommender-list/recommender-list';
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
            {frequencyList ? (
                <h>Recommendations with your top {frequencyList.length} ingredients: {frequencyList}</h>
            ): null}
            <RecipeListLoader isLoading={!isUpdated}/>
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
