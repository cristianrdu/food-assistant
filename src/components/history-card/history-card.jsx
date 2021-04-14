import React from 'react';
import { makeStyles, 
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography } from '@material-ui/core';
import clsx from 'clsx';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.18)'
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

export const HistoryCard = ({history, recipeData}) => { 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { addedAt, id, img, desc, recipeName, instructNotes, ingredNotes, additionalNotes} = recipeData;
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader 
          className={classes.title}
          title={recipeName}
          subheader={`Cooked on ${addedAt}`}
      />
      <CardMedia
          className={classes.media}
          image={img}
      />
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => history.push(`recipes/all/${id}`)}>
        View Recipe
        </Button>
        <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        </IconButton>
      {
        instructNotes || ingredNotes || additionalNotes ?
      (<IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>)
        :null
      } 
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:</Typography>
          <Typography paragraph>
            {instructNotes}
          </Typography>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>
            {ingredNotes}
          </Typography>
          <Typography paragraph>Additional:</Typography>
          <Typography paragraph>
            {additionalNotes}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withRouter(HistoryCard);