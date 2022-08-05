import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink} from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountMenu from "./AccountMenu";
import {CalendarMonth, CalendarToday, Home, Login} from "@mui/icons-material";
import TemporaryDrawer from "./TemporaryDrawer";
import {Grid} from "@mui/material";

export default function ButtonAppBar(...props) {
    const [access_token, setAcess_token] = React.useState(null)

    React.useEffect(() => {
        setAcess_token(localStorage.getItem('authTokenAcess'))
        if (localStorage.getItem('authTokenAcess') === 'null') {
            setAcess_token(null)
        }
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <TemporaryDrawer access_token={access_token}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button to="/" color="inherit" component={RouterLink}>
                            <Home fontSize='medium'/>
                            <Typography variant='h6' paddingLeft={0.5}>Home</Typography>
                        </Button>
                    </Typography>
                    <div align='right'>
                        {access_token ? <AccountMenu/>
                            :
                            <Button to='/signin' color="inherit" component={RouterLink}>
                                <Login/>
                                <Typography variant='subtitle1' paddingLeft={1}>Login</Typography>
                            </Button>
                        }
                    </div>
                    <Grid paddingLeft={{md:3, xs:1}}>
                        <IconButton sx={{ml: 1}} onClick={props[0].colorMode.ToggleDarkMode} color="inherit">
                            {props[0].theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
