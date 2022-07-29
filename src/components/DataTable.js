import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';

function UpdateAttendancceHour(attendance_hour) {
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
            console.log(dados)
        })
}

export default function DataTable(...props) {
    const rows = props[0].rows
    const columns = props[0].columns

    return (
        <div style={{height: 400, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{flexGrow: 1}}>
                    <DataGrid
                        sx={{
                            m: 2,
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                        rows={rows}
                        columns={columns}
                        onCellEditCommit={UpdateAttendancceHour}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </div>
    );
}
