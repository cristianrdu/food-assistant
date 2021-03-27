import React from 'react';

import { CustomCircularProgress } from '../material-ui/circular-progress';

import './loader.css';

const SpinningLoader = WrappedComponent => {
    const Loader = ({ isLoading, ...OtherProps }) => {
        return isLoading ? (
            <div className='loader'>
                <CustomCircularProgress/>
            </div>
        ) : (
            <WrappedComponent {...OtherProps} />
            )
    }
    return Loader;
};

export default SpinningLoader;