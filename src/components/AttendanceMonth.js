import React from 'react';
import {Container, Grid} from "@mui/material";
import DataTable from "./DataTable";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {getInitialMonth} from "../hooks/GetDataApi";

function RenderAttendanceMonth(values, columns) {
    const rows = PopulateFields(values.getMonth() + 1, values.getFullYear())
    return (<DataTable rows={rows} columns={columns}/>
    )
}


function PopulateFields(month, year) {
    const [mes, setMes] = useState([])
    const access_token = localStorage.getItem('authTokenAcess')

    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    useEffect(() => {
        if (access_token === 'null' || !access_token) {
            navigate('/signin');
            enqueueSnackbar('Você precisa estar logado', {variant: 'warning'})
        }
        getInitialMonth(month, year,  setMes, navigate, enqueueSnackbar)

    }, [month])
    let rows = []
    if (mes.length) {
        rows = mes[0].attendance_day.map(dia => ({
            id: dia.id,
            day: dia.day,
            name: dia.employee_shift,
            attendance_hour: dia.worked_total,
        }))
    }
    return (
        rows
    )
}

function AttendanceMonth() {
    const [value, setValue] = React.useState(new Date());

    const columns = [
        {field: 'day', headerName: 'Dia', flex: 1},
        {field: 'name', headerName: 'Nome', flex: 1},
        {field: 'attendance_hour', headerName: 'Total de horas trabalhadas', flex: 1}
    ];


    return (
        <Container>
            <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} paddingTop={10} justifyContent="center"
                  alignItems="center">
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Year and Month"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    {RenderAttendanceMonth(value, columns)}
                </Grid>
            </Grid>
        </Container>
    );
}

export default AttendanceMonth;
