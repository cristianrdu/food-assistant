import React, { useState } from 'react'

import { makeStyles,
  Button,
  CssBaseline,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton, 
  Box} from '@material-ui/core';
  import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list: {
    height: '172px',
    overflow: 'auto',
    width: '100%'
  },
  box: {
    marginBottom: '10px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  button: {
    marginTop:'10px'
  }
}));

const AddRecipePage = () => {
  const [recipeData, setRecipeData] = useState({
    source: '',
    userMade: true,
    recipeName: '',
    mealType: '',
    desc: '',
    img: '',
    ingred: [],
    instruct: [],
    cookTime: '',
    prepTime: '',
    //TODO: add ingredKeywords generation in the recipe actions
  });
  const [ingredient, setIngredient] = useState('');
  const [instruction, setInstruction] = useState('');

  const addIngredientToList = () => {
    if(ingredient.trim()){
      setRecipeData({...recipeData, ingred: [...recipeData.ingred, ingredient]});
      setIngredient('');
    }
  };

  const removeIngredientFromList = (index) => {
    const data = recipeData.ingred.filter(a => a != recipeData.ingred[index])
    setRecipeData({...recipeData, ingred: data});
  };

  const addInstructionToList = () => {
    if(instruction.trim()){
      setRecipeData({...recipeData, instruct: [...recipeData.instruct, instruction]});
      setInstruction('');
    }
  };

  const removeInstructionFromList = (index) => {
    const data = recipeData.instruct.filter(a => a != recipeData.instruct[index])
    setRecipeData({...recipeData, instruct: data});
  };

  const classes = useStyles();
  
  const submitRecipe = event => {
    event.preventDefault();
  }

  const handleChange = event => {
    const { name, value } = event.target;

    setRecipeData({...recipeData, [name]: value });
    console.log(recipeData)
  };
  return(
    <Container component="main" maxWidth="md">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
      Add Your Own Recipe
      </Typography>
      <form className={classes.form} onSubmit={submitRecipe}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              name="recipeName"
              variant="outlined"
              required
              fullWidth
              id="recipeName"
              label="Recipe Name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="mealType">Meal Type</InputLabel>
              <Select
                name="mealType" 
                id="mealType"
                value={recipeData.mealType}
                onChange={handleChange}
                label="Meal Type"
              >
                <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                <MenuItem value={'lunch'}>Lunch</MenuItem>
                <MenuItem value={'dinner'}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="img"
              variant="outlined"
              required
              fullWidth
              id="img"
              label="Link to image"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cookTime"
              variant="outlined"
              required
              type="time"
              fullWidth
              defaultValue="00:00"
              label="Cooking Time"
              id="cookTime"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="prepTime"
              variant="outlined"
              required
              type="time" 
              fullWidth
              defaultValue="00:00"
              label="Preparation Time"
              id="prepTime"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="desc"
              variant="outlined"
              required
              fullWidth
              multiline
              rowsMax="5"
              id="desc"
              label="Recipe Description"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xm={12} sm={6}>
            <Typography variant="h6">
              Ingredients
            </Typography>
            <Box border={1} borderColor='grey.500' className={classes.box}> 
              <List dense className={classes.list}>
                { recipeData.ingred.map(item =>
                  (<ListItem>
                    <ListItemText primary={item}/>
                    <ListItemSecondaryAction>
                      <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => {removeIngredientFromList(recipeData.ingred.indexOf(item))}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)
                )}
              </List>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                name="ingredField"
                id="ingredField"
                label="Add Ingredients"
                variant="outlined"
                fullWidth
                value={ingredient}
                onChange={(event) => {
                  setIngredient(event.target.value);
                }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button form='ingreds' className= {classes.button} variant="outlined" color="primary" onClick={addIngredientToList}>
                  ADD
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xm={12} sm={6}>
          <Typography variant="h6">
              Instructions
            </Typography>
            <Box border={1} borderColor='grey.500' className={classes.box}> 
              <List dense className={classes.list}>
                { recipeData.instruct.map(item =>
                  (<ListItem>
                    <ListItemText primary={item} secondary={`Step ${recipeData.instruct.indexOf(item) + 1}`}/>
                    <ListItemSecondaryAction>
                      <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => {removeInstructionFromList(recipeData.instruct.indexOf(item))}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)
                )}
              </List>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                name="instructField"
                id="instructField"
                label="Add Instructions"
                variant="outlined"
                fullWidth
                value={instruction}
                onChange={(event) => {
                  setInstruction(event.target.value);
                }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button className= {classes.button} variant="outlined" color="primary" onClick={addInstructionToList}>
                  ADD
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
          Submit Recipe
        </Button>
      </form>
    </div>
    </Container>
  )
}

export default AddRecipePage
