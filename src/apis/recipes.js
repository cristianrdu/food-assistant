import axios from "axios";
import { addCollectionAndDocuments } from '../firebase/firebase.utils';

export const postYummlyRecipes = () => {
  const options = {
    method: 'GET',
    url: 'https://yummly2.p.rapidapi.com/feeds/list',
    params: {limit: '18', start: '0', tag: 'list.recipe.popular'},
    headers: {
      'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
      'x-rapidapi-host': 'yummly2.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data.feed);
    addCollectionAndDocuments('yummly-recipes', response.data.feed);
  }).catch(function (error) {
    console.error(error);
  });
}

export const postCookbookIORecipes = (recipeUrl) => {
  const options = {
    method: 'POST',
    url: 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi',
    headers: {
      'content-type': 'application/xml',
      'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
      'x-rapidapi-host': 'mycookbook-io1.p.rapidapi.com'
    },
    data: `${recipeUrl}`
    // data: 
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    addCollectionAndDocuments('cookbookio-recipes', response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export const searchWebnoxRecipes = () => {
  const options = {
    method: 'GET',
    url: 'https://webknox-recipes.p.rapidapi.com/recipes/search',
    params: {query: 'chicken', type: 'main course', offset: '0', number: '10'},
    headers: {
      'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
      'x-rapidapi-host': 'webknox-recipes.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data.results);
    // addCollectionAndDocuments('Webnox-searcher-recipes', response.data.results);
  }).catch(function (error) {
    console.error(error);
  });
}

export const searchPlusIngredientWebnoxRecipes = () => {
  const options = {
    method: 'GET',
    url: 'https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients',
    params: {ingredients: 'apples,flour,sugar', number: '5'},
    headers: {
      'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
      'x-rapidapi-host': 'webknox-recipes.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export const postWebnoxRecipes = (recipeUrl) => {
  const options = {
    method: 'GET',
    url: 'https://webknox-recipes.p.rapidapi.com/recipes/extract',
    params: {url: `${recipeUrl}`},
    headers: {
      'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
      'x-rapidapi-host': 'webknox-recipes.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    addCollectionAndDocuments('webnox-recipes', response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

