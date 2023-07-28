import * as React from 'react'
import { Page, SectionContainer } from '../../component'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Alert from '../../component/Alert/AlertPopup'
import DrawerComponent from '../../component/DrawerComponent'
import homeService from '../../services/home.service'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Modal from "@mui/material/Modal";
import VerifyEmail from "../../../src/pages/admin/VerifyEmail"
import usersService from '../../services/users.service'
import CryptoJS from 'crypto-js';
import { decrypt, encrypt, singleHash } from '../../sections/auth/register_company/Encrypt&Decrypt'

type Anchor = 'top' | 'left' | 'bottom' | 'right'
export default function Dashboard() {
  // state variables that are being used in a React component to manage object data

  const [selectedId, setSelectId] = React.useState('')
  const [dashboardData, setDashboardData] = React.useState<any>(null)
  const [dashboardModelCount, setDashboardModelCount] = React.useState(0)
  const [userTask, setUserTask] = React.useState([])
  const [pageSizeUser, setPageSizeUser] = React.useState(5)
  const [pageUser, setPageUser] = React.useState(0)
  const [rowsCountUser, setRowsCountUser] = React.useState(0)
  const [userLog, setUserLog] = React.useState([])
  const [pageSizeUserLog, setPageSizeUserLog] = React.useState(5)
  const [pageUserLog, setPageUserLog] = React.useState(0)
  const [rowsCountUserLog, setRowsCountUserLog] = React.useState(0)
  const [isLoadingAdmin, setIsLoadingAdmin] = React.useState(true)
  const [isLoadingUser, setIsLoadingUser] = React.useState(true)
  const [isLoadingUserLog, setIsLoadingUserLog] = React.useState(true)
  const [adminTask, setAdminTask] = React.useState([])
  const [pageSizeAdmin, setPageSizeAdmin] = React.useState(5)
  const [pageAdmin, setPageAdmin] = React.useState(0)
  const [rowsCountAdmin, setRowsCountAdmin] = React.useState(0)
  const [selectedUser, setSelectedUser] = React.useState<any>({});
  const [approveEmail,setApproveEmail] = React.useState({
    isActive: false,
    row: '',
  })
  const [state, setState] = React.useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  //use to navigate to different page
  const navigate = useNavigate()
  
  const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
  const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
  const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
  const  intermitent_key = encrypt( model_key, model_password).encrypted
  const master_key = decrypt(intermitent_key, headset_key)

  //This column shows the email of the user who performed the activity. The value is extracted from the createdId property of the row and rendered using a Typography component. The noWrap prop is used to prevent the email from being wrapped if it's too long.
  async function addPassword(ctx,approveEmail) {
    debugger
    const hashedPassword = singleHash(ctx.password)
    const { isError, message } = await usersService.addPassword(ctx.customer_id, hashedPassword, approveEmail);
    if (!isError) {
      toast.success(message);
      setSelectedUser({});
      console.log("Clear Data , ", selectedUser)
      handleClose();
      // approveRequest(hashedPassword, approveEmail)
    } else {
      toast.error(message);
    }
  }

  const userLogColumn = [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'User Email',
      field: 'email',
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap>
            {!!row['email'] && row['email']}
          </Typography>
        )
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'User Name',
      field: 'list',
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap>
             {decrypt(master_key, row.createdId.display_name_encrypted)}
          </Typography>
        );
      },
    },
    
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Activity',
      field: 'name',
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ textTransform: 'capitalize' }}>
            {row['name']}
          </Typography>
        )
      },
    },
  ]
  const defaultColumns = [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'User',
      field: 'createdId',
      sortable: false,
      renderCell: ({ row }: any) => {
        return <Typography noWrap>{row['createdId']['email']}</Typography>
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Activity',
      field: 'name',
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Typography noWrap sx={{ textTransform: 'capitalize' }}>
            {row['name']}
          </Typography>
        )
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Action',
      field: '',
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Stack rowGap={2} direction="row">
            <Button
              color="success"
              onClick= {() => 
                {
                  handleOpen()
                  // approveRequest(row, false)
                // setApproveEmail(row,true)
                setApproveEmail(prevState => ({ ...prevState, isActive: true, row: row}));
                }  
              }
            >
              Approve
            </Button>
            <Button
              color="error"
              onClick={() => 
                // setApproveEmail(true)
                {
                  handleClose()
                  setApproveEmail(prevState => ({ ...prevState, isActive: false, row: row}));
                }  
              }
                // approveRequest(row, false)
                // setApproveEmail(false)
            >
              Reject
            </Button>
          </Stack>
        )
      },
    },
  ]
  //getAdminTaskDetails() function is making an API call to fetch a list of tasks for the admin user.
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      debugger
      window.location.reload();
      navigate("/", { replace: true })
    }
    //The function uses the homeService.getAdminTaskList() method which takes two parameters, pageAdmin and pageSizeAdmin, to fetch the data.
    else {
      homeService.getDashboardInitialData().then((res) => setDashboardData(res))
      homeService.getModelCountData().then((res) => setDashboardModelCount(res))
      getAdminTaskDetails()
      getUserTaskDetails()
      getLogTaskDetails()
    }
  }, [])

  //After receiving the response, it sets the adminTask, rowsCountAdmin, and isLoadingAdmin states using the response data.
  const getAdminTaskDetails = () => {
    homeService.getAdminTaskList(pageAdmin, pageSizeAdmin).then((res) => {
      setAdminTask(res?.list ?? [])
      setRowsCountAdmin(res?.count ?? 0)
      setIsLoadingAdmin(false)
    })
  }
  const getUserTaskDetails = () => {
    homeService.getUsersTaskList(pageUser, pageSizeUser).then((res) => {
      setUserTask(res?.list ?? [])
      setIsLoadingUser(false)
      setRowsCountUser(res?.count ?? 0)
    })
  }
  const getLogTaskDetails = () => {
    debugger
    homeService.getLogTaskList(pageUserLog, pageSizeUserLog).then((res) => {
      setUserLog(res?.list ?? [])
      setIsLoadingUserLog(false)
      setRowsCountUserLog(res?.count ?? 0)
    })
  }
  //This function is called inside the useEffect() hook with an empty dependency array, so it runs once when the component mounts.
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate("/", { replace: true })
    }
    getAdminTaskDetails()
  }, [pageAdmin, pageSizeAdmin])

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate("/", { replace: true })
    }
    getUserTaskDetails()
  }, [pageUser, pageSizeUser])

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate("/", { replace: true })
    }
    getLogTaskDetails()
  }, [pageUserLog, pageSizeUserLog])

  // A function called toggleDrawer which takes in an Anchor and a boolean open and returns a function that takes in an event. This function sets the state of state with the anchor and open values.
  const [swalProps, setSwalProps] = React.useState({})
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const passData = (data) => {
    approveRequest(approveEmail,data)
  }
  const approveRequest = (approveEmail,data) => {
    debugger
    const hashedPassword = singleHash(data.password); 
    const payload = {
      primaryId: approveEmail.row._id,
      page: pageAdmin,
      limit: pageSizeAdmin,
      is_approval: approveEmail.isActive,
      password: hashedPassword
    }
    homeService.approveEmail(payload).then((res) => {
      if (res.message) {
        toast.success(res.message)
        getAdminTaskDetails()
        handleClose()
      } else {
        toast.error(res.message)
      }
    })
  }
  //It includes several components from the Material-UI library such as Grid, Typography, DataGrid, Box, and SectionContainer. The dashboard displays various statistics about users, models uploaded, and tasks, and also includes a table with admin tasks, user tasks, and logs.
  return (
    <Page title="Home" >
      <Alert
        swalProps={swalProps}
        onConfirm={(result) => {
          setSelectId('')
          setSwalProps({})
        }}
        didClose={() => {
          setSelectId('')
          setSwalProps({})
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <SectionContainer title="Total Users">
            <Typography variant="h4" color="error" id="dashboard">
              {dashboardData?.countTotalUser
                ? dashboardData?.countTotalUser
                : 0}{' '}

            </Typography>
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <SectionContainer title="Total Active User">
            <Typography variant="h4" color="error" id="dashboard">
              {dashboardData?.countTotalApprovalUser
                ? dashboardData?.countTotalApprovalUser
                : 0}
            </Typography>
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <SectionContainer title="Total Blocked User">
            <Typography variant="h4" color="error" id="dashboard">
              {dashboardData?.countTotalPendingUser
                ? dashboardData?.countTotalPendingUser
                : 0}
            </Typography>
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <SectionContainer title="Total Models Uploaded">
            <Typography variant="h4" color="error" id="dashboard">
              {dashboardModelCount
                ? dashboardModelCount
                : 0}
            </Typography>
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SectionContainer title="Admin Tasks">
            <DataGrid
              autoHeight
              rows={adminTask}
              rowCount={rowsCountAdmin}
              checkboxSelection={false}
              pageSize={pageSizeAdmin}
              disableSelectionOnClick
              columns={defaultColumns}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageSizeChange={(page) => {
                setPageSizeAdmin(page)
              }}
              page={pageAdmin}
              loading={isLoadingAdmin}
              onPageChange={(newPage) => {
                setPageAdmin(newPage)
              }}
              pagination
              paginationMode="server"
            />
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SectionContainer title="User Tasks">
            <DataGrid
              autoHeight
              rows={userTask}
              rowCount={rowsCountUser}
              checkboxSelection={false}
              pageSize={pageSizeUser}
              disableSelectionOnClick
              columns={userLogColumn}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageSizeChange={(page) => {
                setPageSizeUser(page)
              }}
              page={pageUser}
              loading={isLoadingUser}
              onPageChange={(newPage) => {
                setPageUser(newPage)
              }}
              pagination
              paginationMode="server"
            />
            {/* )} */}
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SectionContainer title="Logs">
            <>
              <DataGrid
                autoHeight
                rows={userLog}
                rowCount={rowsCountUserLog}
                checkboxSelection={false}
                pageSize={pageSizeUserLog}
                disableSelectionOnClick
                columns={userLogColumn}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 25, 50]}
                onPageSizeChange={(page) => {
                  setPageSizeUserLog(page)
                }}
                page={pageUserLog}
                loading={isLoadingUserLog}
                onPageChange={(newPage) => {
                  setPageUserLog(newPage)
                }}
                pagination
                paginationMode="server"
              />
            </>
          </SectionContainer>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          id="add-user-modal"
        >
          <VerifyEmail
          selectedUser={selectedUser}
          onAddPassword={passData} />
        </Modal>
        <DrawerComponent
          anchor={'right'}
          toggleDrawer={toggleDrawer}
          state={state}
        >
          <Box
            sx={{
              width: 400,
            }}
            padding={3}
            role="presentation"
          >
          </Box>
        </DrawerComponent>
      </Grid>
    </Page>
  )
}












