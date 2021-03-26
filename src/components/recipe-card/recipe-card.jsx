import React from 'react'
import { withRouter } from 'react-router-dom';
import './recipe-card.css';
import CustomButton from '../material-ui/custom-button';

export const RecipeCard = ({ history, match, recipeData}) => {
    const  {id, recipe, searchKeywords} = recipeData;
    const { desc, img, recipeName } = recipe;
    const recipeUrl = match.url === '/' ? 'recipes/all' : match.url;
    return (
        <div className='card'>
            <div className='container'>
                <img src={img} alt=''/>
            </div>
            <div className='details'>
                <h3>{recipeName}</h3>
                {
                    searchKeywords ?     
                    (<b>{`Contains: ${searchKeywords.join(', ')}`}</b>) 
                    : null
                }
                
                <p>{desc}</p>
            </div>
            <div className='btn' onClick={() => history.push(`${recipeUrl}/${id}`)}>
                <CustomButton> 
                    View Recipe
                </CustomButton>
            </div>
        </div>
    )
}

export default withRouter(RecipeCard);
