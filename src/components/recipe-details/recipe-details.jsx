import React, {useState} from 'react'
import { connect } from 'react-redux';
import { selectRecipeDetails } from '../../redux/recipe/recipe.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { addToUserHistory } from '../../redux/user/user.actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// https://stackoverflow.com/questions/36392048/how-can-i-get-ownprops-using-reselect-on-redux

const RecipeDetails = ({recipeData, currentUser, addToUserHistory}) => {
    const [open, setOpen] = useState(false);
    const [instructNotes, setInstructions] = useState('');
    const [ingredNotes, setIngredients] = useState('');
    const [additionalNotes, setAdditional] = useState('');

    const { recipe, id } = recipeData;
    const { desc, img, recipeName, ingred, instruct } = recipe;

    const handleClickOpen = () => {
        currentUser ? setOpen(true) : alert("You need to login first");
    };
  
    const handleClose = () => {
        setOpen(false); 
    };
    
    const handleSubmit = async () => {
        setOpen(false);
        
        addToUserHistory(id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes);
        alert("added to user history"); 
        
    };

    const onChange = event => {
        switch (event.target.id){
            case 'note1':
                setInstructions(event.target.value);
                break;
            case 'note2':
                setIngredients(event.target.value);
                break;
            case 'note3':
                setAdditional(event.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div className='main'>
            <div className='display-content'>
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
            </div>
            <div className='submit-history'>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add to History
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Recipe to History</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Optionally, you can add notes related to this recipe.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note1"
                        label="Instruction notes"
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note2"
                        label="Ingredient notes"
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note3"
                        label="Any other additional notes"
                        onChange={onChange}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Complete
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
//need to fix order
const mapDispatchToProps = dispatch => ({
    addToUserHistory: (id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes) => dispatch(addToUserHistory(id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, dispatch))
});

const mapStateToProps = (state, ownProps) =>({ 
    recipeData: selectRecipeDetails(ownProps.match.params.recipeId)(state),
    currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);

