import React from 'react'
import { withRouter } from 'react-router-dom';
import './recipe-card.css';
import CustomButton from '../material-ui/custom-button';

export const RecipeCard = ({ history, match, recipeData}) => {
    const  {id, recipe} = recipeData;
    const { desc, img, recipeName } = recipe;
    return (
        <div className='card'>
            <div className='container'>
                <img src={img} alt=''/>
            </div>
            <div className='details'>
                <h3>{recipeName}</h3>
                <p>{desc}</p>
            </div>
            <div className='btn' onClick={() => history.push(`${match.path}/single/${id}`)}>
                <CustomButton> 
                    View Recipe
                </CustomButton>

            </div>
        </div>
    )
}

export default withRouter(RecipeCard);
