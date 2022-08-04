import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from "@mui/material/TextField";
import {StaticTimePicker} from "@mui/x-date-pickers";

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAttendanceDay(...props) {
    const [hour, setHour] = React.useState(new Date());

    const handleChangeHour = (newHour) => {
        setHour(newHour);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Adicionar nova entrada
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Adicionar nova entrada?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Adicione a data desejada
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticTimePicker
                            ampm={false}
                            orientation="landscape"
                            openTo="minutes"
                            value={hour}
                            onChange={handleChangeHour}
                            onAccept={props[0].handleSubmit}
                            onClose={handleClose}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                </DialogContent>
            </Dialog>
        </div>
    );
}
