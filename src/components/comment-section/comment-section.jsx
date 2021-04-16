import React, { useState } from 'react'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectRecipeComments } from '../../redux/recipe/recipe.selectors';
import { postComment, deleteRecipeComment } from '../../redux/recipe/recipe.actions';

import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Button, Paper, Divider, List, makeStyles, TextField, Typography, IconButton } from '@material-ui/core/';

const useStyles = makeStyles(() => ({
    commentSection: { 
        padding: "10px 10px",
        margin: 10, 
    },
    title: {
        marginBottom: 10
    },
    commentList: {
        height: '50vh', 
        maxHeight: '80vh', 
        overflow: 'auto'
    },
    comment:{
        marginBottom: "20px",
        marginLeft: "10px", 
        width: '95%'
    },
    form: {
        width: '100%', 
        marginTop: 2,
    },
    button: {
        marginTop: '10px',
    },
  }));

const CommentSection = ({comments, postComment, recipeId, currentUser, deleteRecipeComment}) => {
    
    const classes = useStyles();
    const [formInput, setFormInput] = useState('');
    const [formValue, setFormValue] = useState('');
    const handleChange = (event) => {
        setFormInput(event.target.value);
        setFormValue(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        
        if (currentUser) {
            if (formInput.trim()) {
                postComment({
                    content: formInput,
                    recipeId, 
                    userName: currentUser.displayName, 
                    userId: currentUser.id 
                }) 
                setFormValue('');
            } else {
                alert("There are only spaces in the comment.");
            }
        } else {
            alert("You need to log in first.")
        }
    };

    return (
        <div>
        <Paper className={classes.commentSection}>
            <h3 className={classes.title}>Comment Section</h3>
            <List className={classes.commentList} >
                { comments.length > 0 ?
                comments
                .sort((a, b) => { return (a.data.createdAt > b.data.createdAt) ? 1 : -1 })
                .map(comment =>  
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" className={classes.comment}>
                    <Grid item xs={10}>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.data.userName}</h4>
                        <p style={{ textAlign: "left" }}>
                        {comment.data.content}{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                        posted: {comment.data.createdAt}
                        </p>
                        <Divider variant="fullWidth"  />
                    </Grid>
                    <Grid item xs={2}>
                        {currentUser && currentUser.id == comment.data.userId ?
                        <IconButton aria-label="delete" onClick={() => {deleteRecipeComment(comment.id)}}>
                            <DeleteIcon/>
                        </IconButton>
                        : undefined
                        }
                    </Grid>
                </Grid>
                ) : <Typography>There are no comments for this recipe yet.</Typography>
                }
            </List>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                name="commentField"
                id="commentField"
                label="Type something here"
                variant="outlined"
                required
                autoFocus
                multiline
                fullWidth
                rowsMax={4}
                value={formValue}
                onChange={handleChange}
                />
                <Button className= {classes.button} type="submit" variant="contained" color="primary">
                  POST
                </Button>
            </form>
    </Paper>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    postComment: (data) => dispatch(postComment(data, dispatch)),
    deleteRecipeComment: (id) => dispatch(deleteRecipeComment(id, dispatch))
});

const mapStateToProps = (state) =>({ 
    comments: selectRecipeComments(state),
    currentUser: selectCurrentUser(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
