import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        common: {
            green:'#42850c'            
        },
        primary:{
            main:'#42850c'
        },
        secondary:{
            main:'#679D3C'
        },
        appBar:{
            main:'white'
        },
        typography: {
            tab:{
                // fontWeight: 700,
                fontSize: '1rem',
            }
        }
    }
})