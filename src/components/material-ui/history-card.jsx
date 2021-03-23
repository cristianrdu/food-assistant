import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.18)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export const HistoryCard = ({history, recipeData}) => { 
  const { addedAt, recipeId, img, desc, recipeName} = recipeData;
  
  const date = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(addedAt.toDate())
  
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardHeader 
            title={recipeName}
            subheader={`Cooked on ${date}`}
        />
        <CardMedia
            className={classes.media}
            image={img}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {desc}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Button size="small" color="primary" onClick={() => history.push(`recipes/all/${recipeId}`)}>
            View Recipe
            </Button>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>
  );
}

export default withRouter(HistoryCard);