import axios from "axios";


export const searchIngredients = (input) => {
    const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    params: {ingr: `${input}`},
    headers: {
        'x-rapidapi-key': 'c0d5f9820fmsh0c9d6f4df20ad34p161189jsn28d56ab93f9f',
        'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
    };

    axios.request(options).then((response) => {
        return response.data;
    }).catch( (error) => {
        return error;
    });
}