import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  
  console.log(instructNotes, ingredNotes, additionalNotes);
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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => history.push(`recipes/all/${id}`)}>
        View Recipe
        </Button>
        <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
        <ShareIcon />
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