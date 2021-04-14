import React,{useState, useEffect} from "react";
import { connect } from 'react-redux';
import { fetchSearchQueryResults, setSearchToOff } from '../../redux/search/search.actions';

import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import searchIngredients from '../../data/apis/ingredients';

export const AutoComplete = ({setSearchToOff, fetchSearchQueryResults}) => {

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

  useEffect(() => {
    if(searchQuery.length)
    {
      fetchSearchQueryResults(searchQuery);      
    }else{
      setSearchToOff();
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
        placeholder="Search by ingredient..."
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
            </React.Fragment>
          ),
        }}
      />
    )}
    />
  )
};

const mapDispatchToProps = dispatch => ({
  fetchSearchQueryResults: (queryParams) => dispatch(fetchSearchQueryResults(queryParams, dispatch)),
  setSearchToOff: () => dispatch(setSearchToOff(dispatch))
});

export default connect(null, mapDispatchToProps)(AutoComplete);
