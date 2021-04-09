import React, { useState, useEffect } from 'react'
import { getRandomRecipes } from '../../data/firebase/firebase.utils';


// https://stackoverflow.com/questions/57739391/firestore-query-for-loop-with-multiple-values
const MealPlan = ({days}) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        populateRecipes();

        async function populateRecipes(){
            try {
                // set loading to true before calling API
                setLoading(true);
                const data = await getRandomRecipes(days);
                setRecipes(data);
                // switch loading to false after fetch is complete
                setLoading(false);
            } catch (error) {
                // add error handling here
                setLoading(false);
                console.log(error);
            }
        }
    },[]);

    return (
        <div>
            { !loading ? 
                (<h1>{recipes.length}</h1>): null
            }
        </div>
    )
}

export default MealPlan
