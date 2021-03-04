import React from 'react'
import './recipe-card.css';

export const RecipeCard = ({recipeData}) => {
    const  {id, recipe} = recipeData;
    const { desc, img, recipeName, source} = recipe;
    return (
        <div className='card'>
            <div className='container'>
                <img src={img}/>
            </div>
            <div className='details'>
                <h3>{recipeName}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default RecipeCard
