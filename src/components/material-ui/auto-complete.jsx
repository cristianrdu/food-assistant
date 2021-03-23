import React,{useState, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import searchIngredients from '../../data/apis/ingredients';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchSearchQueryResults} from '../../data/firebase/firebase.utils';

export const AutoComplete = () => {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState([]);
  const loading = open && options.length === 0;

  
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const searchResults = await searchIngredients(searchTerm);
      if (active && searchResults) {
        setOptions(searchResults);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading,searchTerm]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //async db call with "array-contains-any" using a logical OR.
  useEffect(() => {
    if(searchQuery.length)
      {
        (async () => {
        const recipes = await fetchSearchQueryResults(searchQuery);        
        console.log(recipes);
        })();      
      }
  },[searchQuery])

  return (
    <Autocomplete
    open={open}
    onClose={() => {
      setOpen(false);
    }}
    loading={loading}
    multiple
    id="size-small-standard-multi"
    size="small"
    options={options}
    getOptionSelected={(option, value) => option=== value}
    getOptionLabel={(option) => option}
    onChange={(event,value) => {
      // sets the search query terms
      setSearchQuery(value);
    }}
    onInputChange={(event, value, reason) => {
      if(reason ==='input' && value.length >= 3)
        setOpen(true);
        setSearchTerm(value);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        placeholder="Search an ingredient"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
    />
  )
}

export default AutoComplete;