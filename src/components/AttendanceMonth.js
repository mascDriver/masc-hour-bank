import React from 'react';
import {Container, Grid} from "@mui/material";
import DataTable from "./DataTable";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';

function RenderAttendanceMonth(values, columns) {
    const rows = PopulateFields(values.getMonth(), values.getFullYear())
    return (<DataTable rows={rows} columns={columns}/>
    )
}

function PopulateFields(month, year) {
    const [mes, setMes] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/attendance/month/${month}/year/${year}`)
            .then(resposta => resposta.json())
            .then(dados => {
                setMes(dados)
            })

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
        {field: 'day', headerName: 'Dia', width: 300},
        {field: 'name', headerName: 'Nome', width: 300},
        {field: 'attendance_hour', headerName: 'Total de horas trabalhadas', width: 300}
    ];


    return (
        <Container>
            <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} padding={10}>
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
                {RenderAttendanceMonth(value, columns)}
            </Grid>
        </Container>
    );
}

export default AttendanceMonth;
