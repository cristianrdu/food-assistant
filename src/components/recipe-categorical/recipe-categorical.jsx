import React from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core/';

import RecipeCard from '../recipe-card/recipe-card';

import { selectCategoricalRecipes } from '../../redux/recipe/recipe.selectors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '25px',
    display: 'grid',
    gridGap: '30px',
    margin: 'auto'
    // paddingLeft: '20px',
  },
}));

const RecipeCategorical = ({ recipes, match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 style={{justifyContent:'center', display:'flex'}}>{match.params.routeUrl} Recipes</h2>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
          {recipes.map(recipe => (
            <Grid item xs={12} sm={6} md={3} key={recipes.indexOf(recipe)}>
              <RecipeCard key={recipe.id} recipeData={recipe} />
            </Grid>
          ))}
        </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  recipes: selectCategoricalRecipes(ownProps.match.params.routeUrl)(state)
});

export default connect(mapStateToProps)(RecipeCategorical);
