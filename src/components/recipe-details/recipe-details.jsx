import React from 'react'
import { connect } from 'react-redux';
import CustomButton from '../material-ui/custom-button';
// https://stackoverflow.com/questions/36392048/how-can-i-get-ownprops-using-reselect-on-redux
import { selectRecipeDetails } from '../../redux/recipe/recipe.selectors';
import { addRecipeToUserHistory } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const RecipeDetails = ({recipeData, currentUser}) => {
    const { recipe, id } = recipeData;
    const { desc, img, recipeName, ingred, instruct } = recipe;

    return (
        <div className='main'>
            <p>{id}</p>
            <div className='container'>
                <img src={img} alt=''/>
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
            <div className='btn' onClick={async () => 
                currentUser ? 
                await addRecipeToUserHistory(currentUser.id, id, img, desc, recipeName)
                .then(alert("added to user history")) 
                : alert("You need to login first")}>
                <CustomButton> 
                    Mark as cooked
                </CustomButton>
            </div>
        </div>
    )
}
const mapStateToProps = (state, ownProps) =>({ 
    recipeData: selectRecipeDetails(ownProps.match.params.recipeId)(state),
    currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps)(RecipeDetails);
