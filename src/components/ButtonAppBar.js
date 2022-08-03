import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleDarkMode from "./ToggleDarkMode";
import {CssBaseline, useTheme} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export default function ButtonAppBar() {
    const theme = useTheme();
    const [access_token, setAcess_token] = React.useState(null)

    React.useEffect(() => {
        setAcess_token(localStorage.getItem('authTokenAcess'))
        if (localStorage.getItem('authTokenAcess') === 'null') {
            setAcess_token(false)
        }
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            <CssBaseline/>
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
                        <Button to="/" color="inherit" component={RouterLink}>Home</Button>
                    </Typography>
                    <Typography variant="h6" component="div">
                        <Button to="/day" color="inherit" component={RouterLink}>Dia</Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button to="/month" color="inherit" component={RouterLink}>Mes</Button>
                    </Typography>
                    <div align='right'>
                        {access_token ? <Button color="inherit"
                                                onClick={() => {
                                                    localStorage.setItem("authTokenAcess", null)
                                                    setAcess_token(null)
                                                    window.location = '/'
                                                }}>Logout</Button>
                            : <Button to='/signin' color="inherit" component={RouterLink}>Login</Button>
                        }
                    </div>
                    <div align='right'>
                        <ToggleDarkMode/>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
