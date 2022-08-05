import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddAlarm from '@mui/icons-material/AddAlarm';

export default function SpeedDialTooltipOpen(...props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel="Bater Ponto"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                <SpeedDialAction
                    key={'Agora'}
                    icon={<AddAlarm/>}
                    tooltipTitle={'Agora'}
                    tooltipOpen
                    onClick={
                        () => {
                            props[0].handleSubmit(new Date())
                            setOpen(false)
                        }
                    }
                />
            </SpeedDial>
        </Box>
    );
}
