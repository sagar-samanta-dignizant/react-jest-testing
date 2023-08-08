import { useEffect, useState } from "react";
import { Button, Page, SectionContainer } from "../../component";
import { DataGrid } from "@mui/x-data-grid";
import { IconAddUser } from "../../config/icons.config";
import DrawerComponent from "../../component/DrawerComponent";
import { Box, CircularProgress, Switch, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUser from "../../sections/admin/user/EditUser";
import Modal from "@mui/material/Modal";
import AddUser from "../../sections/admin/user/AddUser";
import usersService from "../../services/users.service";
import toast from "react-hot-toast";
import SearchBar from "../../component/Search";
import AddPassword from "../../sections/admin/user/AddPassword";
import { EditOff, VpnKey, VpnKeyOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import VerifyDelete from "./VerifyDelete";
import VerifyEmailAdmin from "./VerifyEmailAdmin";
import { decrypt, encrypt } from "../../sections/auth/register_company/Encrypt&Decrypt";
type Anchor = "top" | "left" | "bottom" | "right";

//The function Users returns a JSX that renders a tab bar with two tabs, a user list, and a user details section. The tab bar is created using the Tab component from the Material UI library.
export default function Users() {
  //he useState hook is used to declare the following state variables:
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsCount, setRowsCount] = useState(0);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  console.log(JSON.parse(localStorage.getItem("user"))?.is_email_verify);

  const [verify, setVerify] = useState(JSON.parse(localStorage.getItem("user"))?.is_email_verify);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [passSearch, setPassSearch] = useState("");
  const [state, setState] = useState({ right: false });
  const [swalProps, setSwalProps] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({ right: false });

  const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key || "";
  const model_key = JSON.parse(localStorage.getItem("user"))?.model_key || "";
  const model_password = JSON.parse(localStorage.getItem("user"))?.model_password || "";
  const intermitent_key = (model_key && model_password) ? encrypt(model_key, model_password).encrypted : ""
  const master_key = (intermitent_key && headset_key) ? decrypt(intermitent_key, headset_key) : ""


  //The handleOpenHeadSetKey and handleCloseHeadSetKey functions manage the visibility of the dialog box for adding passwords.
  const handleCloseHeadSetKey = () => setShow(false);
  const handleCloseVerifyEmail = () => setSwalProps(false);
  const emailVerify = JSON.parse(localStorage.getItem("user"))?.master_seed;

  useEffect(() => {

  }, [])

  //The addUser function adds new users to the backend using the addUsers function from the usersService module. It takes an array of emails as input, sends a request to the backend to add them to the database, and updates the user list on success.
  async function addUser(ctx) {
    const emails = ctx.map((data) => data.toString().trim());
    const { isError, message } = await usersService.addUsers({ emails });
    if (!isError) {
      toast.success(message);
      handleClose();
      getUser();
    } else {
      toast.error(message);
    }
  }
  async function sendEmailVerification() {
    console.log(verify);
    debugger
    setOpen(true);
    if (!verify) {
      const { isError, message } = await usersService.sendMailVerificationEmail();
      if (!isError) {

      } else {
        toast.error(message);
      }
    }
  }

  // manages headset key of users
  async function addPassword(ctx, approveEmail) {
    const hashedPassword = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(ctx.password)).toString(CryptoJS.enc.Hex);
    const { isError, message } = await usersService.addPassword(ctx.customer_id, hashedPassword, approveEmail);
    if (!isError) {
      toast.success(message);
      setSelectedUser({});
      console.log("Clear Data , ", selectedUser)
      handleCloseHeadSetKey();
      getUser();
    } else {
      toast.error(message);
    }
  }

  //The resetPassword function resets the password of a user using the resetPassword function from the usersService module. It takes a user ID as input, sends a request to the backend to reset the user's password, and updates the user list on success.
  const resetPassword = async () => {
    debugger
    const { isError, message } = await usersService.resetPassword(
      selectedUser._id
    );
    if (!!isError) {
      toast.success(message);
      setState({ right: false });
    } else {
      toast.error(message);
    }
  };

  //The editUser function edits the details of a user using the editUsers function from the usersService module. It takes a user object as input, sends a request to the backend to edit the user's details, and updates the user list on success.
  async function editUser(ctx) {
    debugger
    // const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key || "c67340a2f71ea7c0e9f565899d5ad3e636e7ed299629e8af40cb4604735352705872996c5be73e542826d767c5174e20";
    // const model_key = JSON.parse(localStorage.getItem("user"))?.model_key || "2ec322616861465c4dc07813598fe682";
    // const model_password = JSON.parse(localStorage.getItem("user"))?.model_password || "e4cc4f327b12017b047f327114b0f7204ad19b7f090ea1ed03bc161e38032765";
    // const  intermitent_key = encrypt( model_key, model_password).encrypted
    // const master_key = decrypt(intermitent_key, headset_key)
    // let encrptFirstName = encrypt(master_key, ctx?.firstName).encrypted
    // let encrptPhoneNo = encrypt(master_key, ctx.phoneNo).encrypted

    // const requestBody = {
    //   full_name: encrptFirstName,
    //   phone_no: encrptPhoneNo,
    //   userId: selectedUser._id,
    // };

    // const { isError, message } = await usersService.editUsers(requestBody);
    // if (!isError) {
    //   toast.success(message);
    //   setState({ right: false });
    //   setSelectedUser("");
    //   getUser();
    // } else {
    //   toast.error(message);
    // }
  }

  //The deleteUser function deletes a user using the deleteUsers function from the usersService module. It takes a user ID as input, sends a request to the backend to delete the user, and updates the user list on success.
  async function deleteUser(data) {
    debugger
    if (data) {
      const { isError, message } = await usersService.deleteUsers(
        selectedUser._id
      );

      if (!isError) {
        toast.success(message);
        setState({ right: false });
        getUser();
      } else {
        toast.error(message);

      }
    }
    handleCloseVerifyEmail();
  }


  //The getUser function retrieves the list of users from the backend using the getUsersList function from the usersService module. It takes the search value, page number, page size, sort order, and sort property as input, sends a request to the backend to retrieve the user list, and updates the users and rowsCount state variables on success.
  const getUser = () => {    
    usersService
      .getUsersList(search, page, pageSize, order, sort)
      .then((res) => {
        setUsers(res?.list);
        setRowsCount(res.count);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  //The editStatus function edits the status of a user using the editUsers function from the usersService module. It takes a status and user ID as input,
  async function editStatus(ctx, id) {
    const requestBody = {
      is_active: ctx,
    };
    const { isError, message } = await usersService.editUsers(requestBody, id);

    if (!isError) {
      toast.success(message);
      setState({ right: false });
      setSelectedUser("");
      getUser();
    } else {
      toast.error(message);
    }
  }

  // managing user deails on admin side 
  const defaultColumns = [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Name",
      field: "firstName",
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          !!row["model_key"] ?
            <Typography noWrap sx={{ textTransform: "capitalize" }}>
              {decrypt(master_key, row["full_name"])}
            </Typography> :
            "-"
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Email",
      field: "email",
      renderCell: ({ row }: any) => {
        return <Typography noWrap> {row["email"] || "-"} </Typography>;
      },
    },
    // Check if the condition is true
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Phone Number",
      field: "phoneNo",
      renderCell: ({ row }: any) => {
        return (
          !!row["model_key"] ? <Typography noWrap sx={{ textTransform: "capitalize" }}>
            {decrypt(master_key, row["phone_no"])}
          </Typography> : "-"
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Status",
      field: "",
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <>
            {row["is_delete"] ? (
              <Typography
                noWrap
                sx={{
                  color: (theme) => theme.palette.error.main,
                  fontWeight: 800,
                }}
              >
                Deleted
              </Typography>
            ) : null}


            {!row["is_delete"] && row["is_active"] && row["model_key"] ? (
              <Typography
                noWrap
                sx={{
                  color: (theme) => theme.palette.success.main,
                  fontWeight: 800,
                }}
              >
                Active
              </Typography>
            ) : null}

            {!row["is_delete"] && row["is_active"] && !row["model_key"] ? (
              <Typography
                noWrap
                sx={{
                  color: (theme) => theme.palette.error.main,
                  fontWeight: 800,
                }}
              >
                Activation Pending
              </Typography>
            ) : null}

            {!row["is_active"] ? (
              <Typography
                noWrap
                sx={{
                  color: (theme) => theme.palette.error.main,
                  fontWeight: 800,
                }}
              >
                Activation Pending
              </Typography>
            ) : null}

            {row["is_delete"] && row["is_active"] && row["model_key"] ? (
              <Typography
                noWrap
                sx={{
                  color: (theme) => theme.palette.error.main,
                  fontWeight: 800,
                }}
              >
                Deactive
              </Typography>
            ) : null}

          </>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Active/Inactive",
      field: "is_active",
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <>
            <Switch
              checked={row["is_active"]}
              onChange={() => {
                editStatus(!row["is_active"], row["_id"]);
              }}
              disabled={row["is_delete"]}
            />
          </>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: "Action",
      field: "id",
      sortable: false,
      renderCell: ({ row }: any) => {
        const iconColor = !row["is_delete"] ? "error" : "disabled";
        return (
          <Box display={"flex"}>
            {!!row["model_key"] ? <Box
              onClick={() => {
                if (!row["is_delete"]) {
                  setSelectedUser(row);
                  setState({ right: true });
                }
              }}
              sx={{ cursor: "pointer", marginRight: 2 }}
            >
              <EditIcon color={row["is_delete"] ? "disabled" : "primary"} />
            </Box> : <EditOff />}

            <Box
              onClick={() => {
                if (!row["is_delete"]) {
                  setSelectedUser(row);
                  setSwalProps(true);
                }
              }}
              sx={{ cursor: "pointer" }}
            >
              <DeleteIcon color={iconColor} />
            </Box>

            {!!row["model_key"] ?
              <Box sx={{ cursor: "pointer", marginRight: 2, paddingLeft: 1 }}>
                <VpnKeyOff />
              </Box> :
              <Box
                onClick={() => {
                  if (!row["is_delete"]) {
                    setSelectedUser(row);
                    setShow(true);

                  }
                }}
                sx={{ cursor: "pointer", marginRight: 2, paddingLeft: 1 }}
              >
                <VpnKey />
              </Box>
            }
          </Box>
        );
      },
    },
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: KeyboardEvent | MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as KeyboardEvent).key === "Tab" ||
            (event as KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const fiterData = () => {
    setPassSearch(search);
    getUser();
    setPage(0);
  };
  const resetData = () => {
    if (search !== "") {
      setSearch("");
      fiterData();
      setPage(0);
      setPassSearch("");
    }
  };
  //The hook takes a function as its first argument, which will be executed when the component mounts and every time any of the dependencies in the second argument array change. In this case, the dependencies are page, pageSize, passSearch, order, and sort.

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      // window.location.reload();
      navigate("/", { replace: true });
    }
    getUser();
  }, [page, pageSize, passSearch, order, sort]);

  useEffect(() => {
    const localMasterSeed = JSON.parse(localStorage.getItem("user"))?.is_email_verify;
    if (localMasterSeed) {
      setVerify(localMasterSeed)
    }
  }, [localStorage.getItem("user")]);



  return (
    <Page title="Users">

      <SectionContainer
        title="Users"
        id="users"
        secondary={
          <Button
            startIcon={<IconAddUser />}
            size="small"
            id="userButton"
            onClick={() => sendEmailVerification()}
          >
            Add User
          </Button>
        }
      >
        <>
          {isLoading ? (
            <Box data-testid="loading-spinner" sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress  />
            </Box>
          ) : (
            <div data-testid="user-datagrid">
              <Box display={"flex"} marginBottom={3} justifyContent={"end"}>
                <SearchBar
                  iconClick={() => {
                    fiterData();
                  }}
                  handleChange={(e: any) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
                <Button
                  size="small"
                  id="resetUserButton"
                  onClick={resetData}
                  variant="outlined"
                >
                  Reset
                </Button>
              </Box>
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
                  setPageSize(page);
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
            </div>
          )}
        </>
      </SectionContainer>
      {
        verify ? (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id="add-user-modal"
          >
            <AddUser onAddUser={addUser} />
          </Modal>
        ) : (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id="add-user-modal"
          >
            <VerifyEmailAdmin onSuccessClose={handleClose} />
          </Modal>
        )
      }
      <Modal
        open={show}
        onClose={handleCloseHeadSetKey}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="add-password-modal"
      >
        <AddPassword
          selectedUser={selectedUser}
          onAddPassword={addPassword} />
      </Modal>
      <Modal
        open={swalProps}
        onClose={handleCloseVerifyEmail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="add-password-modal"
      >
        <VerifyDelete
          swalProps={swalProps}
          onSuccessClose={deleteUser} />
      </Modal>
      {
        verify ? (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id="add-user-modal"
          >
            <AddUser onAddUser={addUser} />
          </Modal>
        ) : (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            id="add-user-modal"
          >
            <VerifyEmailAdmin onSuccessClose={handleClose} />
          </Modal>
        )
      }
      <DrawerComponent
        anchor={"right"}
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
          <EditUser
            rows={users}
            selectedUser={selectedUser}
            setState={setState}
            editUser={editUser}
            resetPassword={resetPassword}
          />
        </Box>
      </DrawerComponent>
    </Page>
  );
}
