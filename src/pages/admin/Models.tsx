import {
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Page, SectionContainer } from '../../component'
import SearchBar from '../../component/Search'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import modalService from '../../services/modal.service'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

export default function Models() {
  const [pageSize, setPageSize] = useState(10)
  const [order, setOrder] = useState(1)
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState()
  const [rowsCount, setRowsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('')
 
  //The modalData() function is responsible for fetching the data from the server using the getModalDetails() method of the modalService object. 
  const modalData = async () => {  
    const res = await modalService.getModalDetails( page, pageSize, order, sort)
    console.log(res);
       setUsers(res?.list ?? []);
      setRowsCount(res?.count ?? 0);
      setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  const resetData = () => {
    if (search !== '') {
      setSearch('')
    }
  }

  //Finally, the useEffect() hook is used to perform some initialization tasks when the component is mounted. It checks if there is any user data in the localStorage
  useEffect(() => {
    const users = localStorage.getItem('user')
    if(!users)
    {
      // window.location.reload();
      navigate("/",{replace: true})
    }
    modalData()
  }, [page, pageSize, order, sort])
  
  const defaultColumns = [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'ID',
      field: 'id',
      renderCell: ( {row} : any) => {
        return (
          <Typography noWrap >
           
            {!!row['id'] ? row['id'] : ""}
          </Typography>
        )
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Name',
      field: 'bundle',
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap >
            {!!row['bundle'] ? row['bundle'] : ""}
           
          </Typography>
        )
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Create Date',
      field: 'updateDate',
      renderCell: ({ row }: any) => {
        const date = moment(row['updateDate']);
        const formattedDate = date.isValid() ? date.format('MMMM DD YYYY, HH:mm a') : '';
        
        return (
          <Typography noWrap >
            {formattedDate || row['updateDate']}
          </Typography>
        );
      },
    },
  ]

  //This renders a page for displaying a list of models. It includes various state variables such as pageSize, order, sort, page, users, rowsCount, and isLoading that are managed using the useState hook.
  return (
    <Page title="Models">
      <SectionContainer title="Models">
        <>
          <Box display={'flex'} marginBottom={3} justifyContent={'end'}>
            <SearchBar
              iconClick={() => {
              }}
              handleChange={(e: any) => {
                setSearch(e.target.value)
              }}
              value={search}
            />
            <Button
              size="small"
              id="resetButton"
              onClick={resetData}
              variant="outlined"
            >
              Reset
            </Button>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={4} direction="row">
              <DataGrid
                autoHeight
                rows={users}
                rowCount={rowsCount}
                checkboxSelection={false}
                pageSize={pageSize}
                disableSelectionOnClick
                columns={defaultColumns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 25, 50]}
             
                onPageSizeChange={(page) => {
                  setPageSize(page)
                }}
                page={page}
                loading={isLoading}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
                pagination
                paginationMode="server"
                sortingMode="server"
                sortingOrder={["asc", "desc"]}
                onSortModelChange={(data) => {
                  setSort(data[0]?.field);
                  setOrder(data[0]?.sort === "asc" ? 1 : -1);
                }}
              />    
            </Stack>
          )}
        </>
      </SectionContainer>
    </Page>
  )
}
