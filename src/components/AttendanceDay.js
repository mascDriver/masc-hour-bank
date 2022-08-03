import React from 'react';
import {Container, Grid, LinearProgress} from "@mui/material";
import DataTable from "./DataTable";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateAttendanceDay from "./CreateAttendanceDay";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

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
const URL = 'http://127.0.0.1:8000'

export default function AttendanceDay() {
    const [isLoading, setLoading] = React.useState(true);
    const [row, setRow] = React.useState([]);
    const [date, setDate] = React.useState(new Date);
    const access_token = localStorage.getItem('authTokenAcess')
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (access_token === 'null') {
            navigate('/signin');
            enqueueSnackbar('Você precisa estar logado', {variant: 'warning'})
        }
        initialDate();
    }, []);

    const initialDate = () => {
        const value = new Date()
        const day = value.getUTCDate()
        const month = value.getMonth() + 1
        const year = value.getFullYear()

        fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
            {
                method: "get",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + access_token,
                }
            })
            .then(resposta => resposta.json())
            .then(dados => {
                if (dados.length) {
                    setRow(FormatRow(dados[0]))
                }
                setLoading(false)
            })
    }
    const handleSubmit = (hour) => {
        const attendance_date = new Date(date.toDateString() + ' ' + hour.toTimeString())
        var data = {
            "attendance_hour": attendance_date.toISOString(),
            "employee_shift": 1
        }

        const day = hour.getUTCDate()
        const month = hour.getMonth() + 1
        const year = hour.getFullYear()

        fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
            {
                method: "post",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + access_token,
                },
                body: JSON.stringify(data)
            })
            .then(resposta => resposta.json())
            .then(dados => {
                setRow(FormatRow(dados))
            })
    };
    const updateAttendancceHour = (attendance_hour) => {
        var data = {
            id: attendance_hour.id.split('_')[0],
            attendance_hour: attendance_hour.value,
        };

        fetch(`${URL}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
            {
                method: "patch",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + access_token,
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

        fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
            {
                method: "get",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + access_token,
                }
            })
            .then(resposta => resposta.json())
            .then(dados => {
                if (dados.length) {
                    setRow(FormatRow(dados[0]))
                } else {
                    setRow([])
                }
            })
    }

    const deletedAttendanceHour = React.useCallback(
        (attendance_hour) => () => {
            setTimeout(() => {
                const data = {
                    id: attendance_hour.id.split('_')[0],
                };

                fetch(`${URL}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
                    {
                        method: "delete",
                        credentials: "same-origin",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            'Authorization': "Bearer " + access_token,
                        },
                        body: JSON.stringify(data)
                    })
                    .then(resposta => resposta.json())
                    .then(dados => {
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
                <CreateAttendanceDay handleSubmit={handleSubmit}/>
                {isLoading ? <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        components={{
                            LoadingOverlay: LinearProgress,
                        }}
                        loading
                        columns={columns}
                        rows={[]}
                    />
                </div> : <DataTable rows={row} columns={columns} onCellEditCommit={updateAttendancceHour}/>
                }
            </Grid>
        </Container>
    );

}

