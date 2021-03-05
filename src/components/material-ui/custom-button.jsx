import React from 'react'

import Button from '@material-ui/core/Button';

const CustomButton = ({children}) => {
    return (
    <Button variant="contained" color='primary' >
        {children}
    </Button>
    )
}

export default CustomButton
