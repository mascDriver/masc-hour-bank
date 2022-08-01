import React from 'react';
import {Container, Grid} from "@mui/material";
import DataTable from "./DataTable";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

function FormatRow(dados) {
    return (
        dados.attendance_hour.map(dia => ({
            id: `${dia.id}_${dados.id}`,
            day: dados.day,
            name: dados.employee_shift,
            attendance_hour: dia.hour,
        }))
    )
}

export default function AttendanceDay() {
    const [row, setRow] = React.useState([]);
    const [date, setDate] = React.useState(new Date);

    const updateAttendancceHour = (attendance_hour) => {
        var data = {
            id: attendance_hour.id.split('_')[0],
            attendance_hour: attendance_hour.value,
        };

        fetch(`http://127.0.0.1:8000/attendance/day/${attendance_hour.id.split('_')[1]}/`,
            {
                method: "patch",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(resposta => resposta.json())
            .then(dados => {
                setRow(FormatRow(dados))
            })
    }

    const populateFields = (value) => {
        const day = value.getUTCDate()
        const month = value.getMonth() + 1
        const year = value.getFullYear()

        let attendance = []
        fetch(`http://127.0.0.1:8000/attendance/day/${day}/month/${month}/year/${year}`)
            .then(resposta => resposta.json())
            .then(dados => {
                if (dados.length) {
                    setRow(FormatRow(dados[0]))
                }
            })
    }

    const deletedAttendanceHour = React.useCallback(
        (attendance_hour) => () => {
            setTimeout(() => {
                var data = {
                    id: attendance_hour.id.split('_')[0],
                };

                fetch(`http://127.0.0.1:8000/attendance/day/${attendance_hour.id.split('_')[1]}/`,
                    {
                        method: "delete",
                        credentials: "same-origin",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(resposta => resposta.json())
                    .then(dados => {
                        console.log(dados)
                        setRow(FormatRow(dados))
                    })
            });
        },
        [],
    );
    const columns = [
        {field: 'day', headerName: 'Dia', width: 300, type: 'date'},
        {field: 'name', headerName: 'Nome', width: 300},
        {field: 'attendance_hour', headerName: 'Hora Batida', width: 300, editable: true},
        {
            field: 'actions', type: 'actions', width: 80, getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={deletedAttendanceHour(params)}
                />
            ],
        },
    ];

    return (
        <Container>
            <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} padding={10}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['day']}
                        label="Year, month and date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue)
                            populateFields(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                    />
                </LocalizationProvider>
                <DataTable rows={row} columns={columns} onCellEditCommit={updateAttendancceHour}/>
            </Grid>
        </Container>
    );
}

