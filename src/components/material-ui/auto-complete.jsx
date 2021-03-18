import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import searchIngredients from '../../apis/ingredients';

export const AutoComplete = () => {
  const [results,setResults] = useState([]);
  
  const changeOptionBaseOnValue = async (input) => {
   setResults(await searchIngredients(input));
  }
  
  return (
    <Autocomplete
    multiple
    id="size-small-standard-multi"
    size="small"
    options={results}
    getOptionLabel={(option) => option}
    onInputChange={(event, value, reason) => {
      if(reason ==='input' && value.length >= 3)
        changeOptionBaseOnValue(value);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        placeholder="Add an ingredient"
      />
    )}
    />
  )
}

export default AutoComplete;