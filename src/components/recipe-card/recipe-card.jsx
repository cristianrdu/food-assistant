import React from 'react'
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 420,
      borderRadius: '10px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.18)',
    },
    title: {
      color:'#42850c'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  }));

export const RecipeCard = ({ history, match, recipeData}) => {
    const classes = useStyles();

    const  {id, recipe, searchKeywords} = recipeData;
    const { img, recipeName } = recipe;
    const recipeUrl = match.url === '/' || match.url === '/suggestions' ? 'recipes/all' : match.url;
    return (
        <div className={classes.card}>
            <Card className={classes.root}>
                <CardHeader className={classes.title} title={recipeName}/>
                <CardMedia className={classes.media} image={img}/>
                { searchKeywords ?     
                  (<CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {`Contains: ${searchKeywords.join(', ')}`}
                    </Typography>
                  </CardContent>) 
                : null }
                <CardActions disableSpacing>
                  <Button size="small" color="primary" onClick={() => history.push(`${recipeUrl}/${id}`)}>
                  View Recipe
                  </Button>
                  <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                  </IconButton>
                  {/* <IconButton aria-label="share">
                  <ShareIcon />
                  </IconButton> */}
                </CardActions>
            </Card>
        </div>


    )
}

export default withRouter(RecipeCard);
