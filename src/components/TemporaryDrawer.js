import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {Link as RouterLink} from "react-router-dom";
import {CalendarMonth, CalendarToday, Home, Login} from "@mui/icons-material";
import {Adsense} from "@ctrl/react-adsense";

export default function TemporaryDrawer(...props) {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton to="/" color="inherit" component={RouterLink}>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary={'Home'}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            {props[0].access_token ?
                <List>
                    <ListItem disablePadding>
                        <ListItemButton to="/day" color="inherit" component={RouterLink}>
                            <ListItemIcon>
                                <CalendarToday/>
                            </ListItemIcon>
                            <ListItemText primary={'Horários no dia'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton to="/month" color="inherit" component={RouterLink}>
                            <ListItemIcon>
                                <CalendarMonth/>
                            </ListItemIcon>
                            <ListItemText primary={'Horários no mês'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <Adsense
                            client="ca-pub-6475308370183973"
                            slot="2841210471"
                            style={{display: 'block'}}
                            layout="display"
                            format="auto"
                        />
                    </ListItem>
                </List>
                :
                <List>
                    <ListItem disablePadding>
                        <ListItemButton to="/signin" color="inherit" component={RouterLink}>
                            <ListItemIcon>
                                <Login/>
                            </ListItemIcon>
                            <ListItemText primary={'Login'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <Adsense
                            client="ca-pub-6475308370183973"
                            slot="2841210471"
                            style={{display: 'block'}}
                            layout="display"
                            format="auto"
                        />
                    </ListItem>
                </List>
            }
        </Box>
    );

    return (
        <div>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}
                        onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}
