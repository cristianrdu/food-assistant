import React from 'react'
import AutoComplete from '../auto-complete/auto-complete';

import './search-box.css';

const SearchBox = () => {
    return (
        <div className='search-box'>
            <AutoComplete/>
        </div>
    )
}

export default SearchBox
