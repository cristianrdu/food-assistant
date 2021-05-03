import React, { useState, useEffect, Fragment } from 'react'
import { processTimers } from '../../data/data.utils';
import CommentSectionContainer from '../comment-section/comment-section-container';
import SpinningLoader from '../loader/loader';

import MuiAlert from '@material-ui/lab/Alert';
import { Button, TextField, makeStyles, 
    CardMedia, CardHeader, Paper, Grid, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';

const CommentSectionLoader = SpinningLoader(CommentSectionContainer);

const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      maxWidth: '100vw',
      flexGrow: 1,
    },
    paperLeft: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '10px'
    },
    paperRight: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      margin: '10px'
    },
    paperButtons: {
      padding: theme.spacing(4),
      textAlign: 'right',
      color: theme.palette.text.secondary,
      margin: '10px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    title: {
      color:'#42850c'
    },
  }));

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const RecipeDetails = ({getComments, recipeData, currentUser, addToUserHistory, commentsLoading}) => {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);
    const [instructNotes, setInstructions] = useState('');
    const [ingredNotes, setIngredients] = useState('');
    const [additionalNotes, setAdditional] = useState('');
    const [alert, setAlert] = useState({severity:'',message:'',open:false});


    const { recipe, id } = recipeData ? recipeData : {};
    const { desc, img, recipeName, ingred, instruct, cookTime, prepTime, source, user } = recipe ? recipe : {};
    const cookingTime = cookTime ? processTimers(cookTime) : undefined;
    const preppingTime = prepTime ? processTimers(prepTime) : undefined;

    useEffect(() => {
        getComments(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        addToUserHistory({id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes}, ingred);
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
        <div >
            {
                recipeData ? (
            <React.Fragment>
                
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} sm={4}>
                    <Paper component="ul" className={classes.paperLeft}>                    
                        <CardHeader className={classes.title} title={recipeName} subheader={desc}/>
                        <CardMedia className={classes.media} image={img} />
                    </Paper>
                    <Paper component="ul" className={classes.paperLeft} style={{display: 'flex', justifyContent:'center',  gap:'20px'}}>
                        { user ?
                            <Typography> Made By: {user.name}</Typography> :
                            <Typography> Source: <a href={source}>Link</a></Typography> 
                        }
                        { cookingTime ?
                        <Fragment>
                            <TimerIcon/>
                            <Typography>Cook Time: {cookingTime}</Typography> 
                        </Fragment>
                        : undefined }
                        { preppingTime ? 
                        <Fragment>
                            <TimerIcon/>
                            <Typography>Prep Time: {preppingTime} </Typography>
                        </Fragment>
                        : undefined }
                    </Paper> 
                    <Paper component="ul" className={classes.paperButtons}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Add to History
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.paperRight}>
                        <h3>Ingredients: </h3>
                        <ul key='ingreds'>
                            {ingred.map(ingredient =>(
                                <li key={`ingred-${ingred.indexOf(ingredient)}`}>{ingredient}</li>
                            ))}
                        </ul>
                    </Paper>
                    <Paper className={classes.paperRight}>
                        <h3>Instructions:</h3>
                        <ol key='instructs'>
                            {instruct.map(instruction =>(
                                <li key={`instruct-${instruct.indexOf(instruction)}`}>{instruction}</li>
                            ))}
                        </ol>
                    </Paper>
                </Grid>
                <Grid item xs=  {12} sm={3}>
                    <CommentSectionLoader isLoading={commentsLoading} recipeId={id}/>
                </Grid>
            </Grid>
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
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

            </React.Fragment>    
            ) : 
            <Typography style={{display:'flex', justifyContent:'center'}}> Recipe not found. </Typography>
            }
        </div>
    )
}


export default RecipeDetails;

