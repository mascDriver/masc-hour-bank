import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import {CalendarMonth, CalendarToday, Home} from "@mui/icons-material";

export default function TemporaryDrawer() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
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
            <List>
                <ListItem disablePadding>
                    <ListItemButton to="/day" color="inherit" component={RouterLink}>
                        <ListItemIcon>
                            <CalendarToday />
                        </ListItemIcon>
                        <ListItemText primary={'Dia'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton to="/month" color="inherit" component={RouterLink}>
                        <ListItemIcon>
                            <CalendarMonth/>
                        </ListItemIcon>
                            <ListItemText primary={'Mes'}/>
                    </ListItemButton>
                </ListItem>
            </List>
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
