import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectRecipeComments } from '../../redux/recipe/recipe.selectors';
import { postComment } from '../../redux/recipe/recipe.actions';

import { Button, Paper, Divider, List, makeStyles, TextField } from '@material-ui/core/';


const useStyles = makeStyles(() => ({
    commentSection: { 
        padding: "10px 10px",
        marginTop: 10, 
    },
    title: {
        marginBottom: 10,
    },
    commentList: {
        height: '50vh', 
        maxHeight: '80vh', 
        overflow: 'auto'
    },
    form: {
        width: '100%', 
        marginTop: 2,
    },
    button: {
        marginTop: '10px',
    }
  }));

const CommentSection = ({comments, postComment, recipeId, currentUser }) => {
    
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
            postComment({
                content: formInput,
                recipeId, 
                userName: currentUser.displayName, 
                userId: currentUser.id 
            }) 
            setFormValue('');
        } else {
            alert("You need to log in first.")
        }
        
    };

    return (
        <div>
        <Paper className={classes.commentSection}>
            <h3 className={classes.title}>Comment Section</h3>
            <List className={classes.commentList} >
                { comments.sort((a, b) => { return (a.data.createdAt > b.data.createdAt) ? 1 : -1 }).map(comment =>  
                <React.Fragment>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{comment.data.userName}</h4>
                    <p style={{ textAlign: "left" }}>
                    {comment.data.content}{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    posted: {comment.data.createdAt}
                    </p>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </React.Fragment>
                )
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
    postComment: (data) => dispatch(postComment(data, dispatch))
});

const mapStateToProps = (state) =>({ 
    comments: selectRecipeComments(state),
    currentUser: selectCurrentUser(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
