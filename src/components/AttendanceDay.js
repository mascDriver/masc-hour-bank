import React from 'react';
import {Container, Grid} from "@mui/material";
import DataTable from "./DataTable";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';

function RenderAttendanceMonth(values, columns) {
    const rows = PopulateFields(values.getUTCDate(), values.getMonth() + 1, values.getFullYear())
    return (<DataTable rows={rows} columns={columns} />
    )
}

function PopulateFields(day, month, year) {
    const [mes, setMes] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/attendance/day/${day}/month/${month}/year/${year}`)
            .then(resposta => resposta.json())
            .then(dados => {
                setMes(dados)
            })

    }, [day])
    let rows = []
    if (mes.length) {
        rows = mes[0].attendance_hour.map(dia => ({
            id: `${dia.id}_${mes[0].id}`,
            day: mes[0].day,
            name: mes[0].employee_shift,
            attendance_hour: dia.hour,
        }))
    }
    return (
        rows
    )
}

export default function AttendanceDay() {
    const [value, setValue] = React.useState(new Date());

    const columns = [
        {field: 'day', headerName: 'Dia', width: 300, type:'date'},
        {field: 'name', headerName: 'Nome', width: 300},
        {field: 'attendance_hour', headerName: 'Hora Batida', width: 300, editable: true},
    ];


    return (
        <Container>
            <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} padding={10}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['day']}
                        label="Year, month and date"
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

