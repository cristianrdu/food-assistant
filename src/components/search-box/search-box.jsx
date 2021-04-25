import React from 'react'
import AutoCompleteContainer from '../auto-complete/auto-complete-container';

import './search-box.css';

const SearchBox = () => {
    return (
        <div className='search-box'>
            <AutoCompleteContainer/>
        </div>
    )
}

export default SearchBox
