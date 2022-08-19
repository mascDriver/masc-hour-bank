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
import SpeedDialTooltipOpen from "./SpeedDialTooltipOpen";
import {useConfirm} from "material-ui-confirm";
import {getAttendanceDate, getInitialDate} from "../hooks/GetDataApi";
import {deleteAttendenceHour} from "../hooks/DeleteDataApi";

export default function AttendanceDay() {
    const confirm = useConfirm();
    const [isLoading, setLoading] = React.useState(true);
    const [row, setRow] = React.useState([]);
    const [date, setDate] = React.useState(new Date);
    const access_token = localStorage.getItem('authTokenAcess')
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (access_token === 'null' || !access_token) {
            navigate('/signin');
            enqueueSnackbar('Você precisa estar logado', {variant: 'warning'})
        }
        getInitialDate(setRow, setLoading, enqueueSnackbar, navigate);
    }, []);

    const deletedAttendanceHour = React.useCallback(
        (attendance_hour) => () => {
            setTimeout(() => {
                const data = {
                    id: attendance_hour.id.split('_')[0],
                };
                confirm({
                    title: 'Você tem certeza?',
                    description: `Deseja deletar o registro de hora ${attendance_hour.row.attendance_hour}?`
                })
                    .then(() => {
                        deleteAttendenceHour(attendance_hour, data, setRow)
                    })
                    .catch(() => console.log("Deletion cancelled."));
            });
        },
        [],
    );
    const columns = [
        {field: 'day', headerName: 'Dia', flex: 1, type: 'date'},
        {field: 'name', headerName: 'Nome', flex: 1},
        {field: 'attendance_hour', headerName: 'Hora Batida', flex: 1, editable: true},
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
            <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} paddingTop={10} justifyContent="center"
                  alignItems="center">
                <Grid item xs={6} md={8}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="dd/MM/yyyy"
                            views={['day']}
                            label="Dia, mes e ano"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue)
                                getAttendanceDate(newValue, setRow, navigate, enqueueSnackbar, setLoading);
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={2}>
                    <CreateAttendanceDay date={date} setRow={setRow}/>
                </Grid>
                <Grid item xs={12}>
                    {isLoading ? <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            components={{
                                LoadingOverlay: LinearProgress,
                            }}
                            loading
                            columns={columns}
                            rows={[]}
                        />
                    </div> : <DataTable rows={row} columns={columns} setRow={setRow}/>
                    }
                    <SpeedDialTooltipOpen setRow={setRow}/>
                </Grid>
            </Grid>

        </Container>
    );

}

