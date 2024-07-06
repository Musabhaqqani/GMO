import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';

interface grid {
    userId: number,
    id: number,
    title: string,
    body: string
}

const grid: React.FC = () => {
    const [items, setItems] = useState<grid[]>([])
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<grid[]> = await axios.get("https://jsonplaceholder.typicode.com/posts")
                setItems(response.data)
            }
            catch (error) {
                console.log("Error while fetching")
                setError("error while fetching")
            }
        }
        fetchData()
    }, [])
    if (error) {
        return <div>{error}</div>;
    }

    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'User ID', width: 110 },
        { field: 'id', headerName: 'ID', width: 110 },
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'body', headerName: 'Body', width: 400 },

    ];
    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default grid
