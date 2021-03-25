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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// https://stackoverflow.com/questions/36392048/how-can-i-get-ownprops-using-reselect-on-redux

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const RecipeDetails = ({recipeData, currentUser, addToUserHistory}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [instructNotes, setInstructions] = useState('');
    const [ingredNotes, setIngredients] = useState('');
    const [additionalNotes, setAdditional] = useState('');
    const [alert, setAlert] = useState({severity:'',message:'',open:false});

    const { recipe, id } = recipeData;
    const { desc, img, recipeName, ingred, instruct } = recipe;

    const handleClickOpen = () => {
        if(currentUser) 
        {
            setModalOpen(true)
        }
        else{
            setAlert({severity:'warning',message:'You need to login first',open:true});
        }
    };
  
    const handleModalClose = () => {
        setModalOpen(false); 
    };
    
    const handleSubmit = async () => {
        addToUserHistory(id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes);
        setModalOpen(false)
        setAlert({severity:'success',message:'Recipe successfully added to history.',open:true});
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({open:false});
      };

    const handleInputChange = event => {
        switch (event.target.id){
            case 'instructions':
                setInstructions(event.target.value);
                break;
            case 'ingredients':
                setIngredients(event.target.value);
                break;
            case 'additional':
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
                <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Recipe to History</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Optionally, you can add notes related to this recipe.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="instructions"
                        label="Instruction notes"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ingredients"
                        label="Ingredient notes"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="additional"
                        label="Any other additional notes"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Complete
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
//need to fix order
const mapDispatchToProps = dispatch => ({
    addToUserHistory: (id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes) => 
    dispatch(addToUserHistory(id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes, dispatch))
});

const mapStateToProps = (state, ownProps) =>({ 
    recipeData: selectRecipeDetails(ownProps.match.params.recipeId)(state),
    currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);

