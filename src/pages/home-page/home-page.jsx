import React from 'react'
import Directory from '../../components/directory/directory';
import SearchBox from '../../components/search-box/search-box';

import './home-page.css';
const HomePage = () => {
    return (
        <div className='homepage'>
            <SearchBox/>
            <Directory/>
        </div>
    )
}

export default HomePage
