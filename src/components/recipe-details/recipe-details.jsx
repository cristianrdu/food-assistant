import React from 'react'
import { connect } from 'react-redux';
import CustomButton from '../material-ui/custom-button';

import { selectRecipeDetails } from '../../redux/recipe/recipe.selectors';


const RecipeDetails = ({recipeData}) => {
    const { recipe } = recipeData;
    const { desc, img, recipeName, ingred, instruct } = recipe;
    return (
        <div className='main'>
            <div className='container'>
                <img src={img}/>
            </div>
            <div className='details'>
                <h3>{recipeName}</h3>
                <h4>Description</h4>
                <p>{desc}</p>
            </div>
            <div className='ingredients'>
                <h3>Ingredients</h3>
                <ul>
                    {ingred.map(ingredient =>(
                        <li key={ingredient.key}>{ingredient}</li>
                    ))}

                </ul>
            </div>
            <div className='instructions'>
                <h3>Instructions</h3>
                <ol>
                    {instruct.map(instruction =>(
                        <li key={instruction.key}>{instruction}</li>
                    ))}
                </ol>
            </div>
            <div className='btn'>
                <CustomButton> 
                    Coooked/Uncooked
                </CustomButton>

            </div>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => ({
    recipeData: selectRecipeDetails(ownProps.match.params.recipeId)(state)
});

export default connect(mapStateToProps)(RecipeDetails);
