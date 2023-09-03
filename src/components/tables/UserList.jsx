import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function UserTable({ users, token, setUsers, deleteUser }) {
    const [selectedRows, setselectedRows] = useState([])
    const columns = [
        { field: 'name', headerName: 'Name', width: 110 },
        { field: 'email', headerName: 'Email', width: 210 },
        { field: 'gender', headerName: 'Gender', width: 90 },
        { field: 'isEmailVerified', headerName: 'EmailVarified', width: 90 },
        { field: 'phoneNumber', headerName: 'PhoneNumber', width: 130 },

    ];
    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => users.find((row) => row._id === id));
        setselectedRows(selectedRowsData)
    };
    const deleteHandler = () => {
        selectedRows.forEach((item) => {
            // console.log("itemToDelete", item._id);
            setUsers(users.filter(row => row._id !== item._id))
            deleteUser(item._id, token)
        })
    }
    return (
        <div style={{ height: 400, width: '100%', background: "#ffffff" }}>
            {
                selectedRows.length > 0 && (<div style={{
                    display: "flex",
                    justifyContent: 'flex-end',
                }}>
                    <Tooltip title="Delete" onClick={() => deleteHandler()}>
                        <IconButton size='lg'>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>)

            }
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={(r) => r._id}
                disableRowSelectionOnClick
                onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
        </div>
    );
}