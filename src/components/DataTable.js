import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {patchAttendancceHour} from "../hooks/PatchDataApi";


export default function DataTable(props) {
    const rows = props.rows
    const columns = props.columns

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
                        onCellEditCommit={(hour) => {patchAttendancceHour(hour, props.setRow)}}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </div>
    );
}
