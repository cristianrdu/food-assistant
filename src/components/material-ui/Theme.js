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
            main:'#42850c'
        },
        appBar:{
            main:'white'
        },
        typography: {
            tab:{
                fontWeight: 700,
                // textTransform: "none",
                fontSize: '1rem',
            }
        }
    }
})