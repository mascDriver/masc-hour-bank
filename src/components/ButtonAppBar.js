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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        <Button to="/" color="inherit" component={RouterLink}>
                            <Home fontSize='small'/>
                            <Typography variant='subtitle1' paddingLeft={0.5}>Home</Typography>
                        </Button>
                    </Typography>
                    <Typography variant="h6" component="div">
                        <Button to="/day" color="inherit" component={RouterLink}>
                            <CalendarToday fontSize='small'/>
                            <Typography variant='subtitle1' paddingLeft={0.5}>Dia</Typography>
                        </Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button to="/month" color="inherit" component={RouterLink}>
                            <CalendarMonth fontSize='small'/>
                            <Typography variant='subtitle1' paddingLeft={0.5}>Mes</Typography>
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
                    <div align='right'>
                        <IconButton sx={{ml: 1}} onClick={props[0].colorMode.ToggleDarkMode} color="inherit">
                            {props[0].theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton></div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
