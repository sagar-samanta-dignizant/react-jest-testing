import * as React from 'react'
import { Button, Page, Title } from '../../../component'
import { Divider, InputAdornment, useTheme } from '@mui/material'
import Spacer from '../../../component/Spacer'
import { FormInputField, FormProvider } from '../../../component/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UserSchema from '../../../schema/User.schema'
import Alert from '../../../component/Alert/AlertPopup'
import ImageUploader from '../profile/UploadImage'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MuiTelInput } from 'mui-tel-input'
import userService from '../../../services/users.service'
import { defaultValuesUser, defaultValuesUsers } from '../profile/DefaultDataProfile'
import { decrypt, encrypt } from '../../auth/register_company/Encrypt&Decrypt'
import settingsService from '../../../services/settings.service'
import { toast } from 'react-hot-toast'
import { IconEmail, IconName, IconTelephone } from '../../../config/icons.config'
import { TUserDetailsFormData } from '../../../types/adminSetting/adminDetailsType'

export default function EditUser(props) {
  const [swalProps, setSwalProps] = React.useState({})
  const [image, setImage] = React.useState();
  const { selectedUser, editUser, resetPassword } = props
  // this useEffect checks whether is there any update of value of user details
  React.useEffect(() => {
    debugger
    if (selectedUser && selectedUser !== '') {
      // console.log(selectedUser);
      const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key || "";
      const model_key = JSON.parse(localStorage.getItem("user"))?.model_key || "";
      const model_password = JSON.parse(localStorage.getItem("user"))?.model_password || "";
      const intermitent_key = (model_key && model_password) ? encrypt(model_key, model_password).encrypted : ""
      const master_key =(intermitent_key && headset_key) ? decrypt(intermitent_key, headset_key) : ""
      setValue('email', selectedUser?.email)
      setValue('firstName', decrypt(master_key, selectedUser?.full_name?.split(' ')[0]))
      // setValue('lastName', selectedUser?.full_name?.split(' ')[1])
      // setValue('displayName', selectedUser?.display_name)
      setValue('phoneNo', decrypt(master_key, selectedUser?.phone_no))
      // setValue('role', selectedUser?.role)

      setImage(selectedUser?.avatar)
      // console.log(image);
    }
  }, [props])

  const uploadFile = async (data: any) => {
    debugger
    const formdata = new FormData();
    formdata.append("userFile", data[0]);
    formdata.append("userId", selectedUser._id);

    const { isError, dataI, message } = await settingsService.editAdminProfile(
      formdata,
    );
    debugger
    if (!isError) {
      toast.success(message);
      setImage(dataI.data.avatar)
    } else {
      toast.error(message);
    }
  };

  // set image of user
  async function fetchGetUserProfileImage(userId) {
    const res = await userService.getUserProfileImage(userId);
    if (!res.isError) {
      // setValue('profileImage', res.message)
    }
  }

  // yup resolver to validate user profile
  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: defaultValuesUsers,
  })


  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;



  const onSubmit = async (data: TUserDetailsFormData) => {
    debugger
    editUser(data);
  };

  const theme = useTheme();
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main;

  return (
    <>
      <Alert swalProps={swalProps} />
      <Page title="Users">
        <Title>
          Edit
        </Title>
        <Spacer>
          <Divider />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Spacer>
              <Spacer direction="row">
                <FormInputField
                  name="firstName"
                  label="First Name *"
                  type="text"
                  placeholder="firstName"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconName color={isError("firstName")} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Spacer>
              <FormInputField
                name="phoneNo"
                label="Mobile No *"
                type="text"
                placeholder="Mobile No"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconTelephone color={isError("phoneNo")} />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <MuiTelInput
                fullWidth
                name="phoneNo"
                value={watch('phoneNo')}
                onChange={value => setValue('phoneNo', value)}
                required
                placeholder="Mobile Number *"
              /> */}
              {/* <FormControl fullWidth> */}
              {/* <InputLabel id="demo-simple-select-label">Role</InputLabel> */}
              {/* <Select
                  name="role"
                  placeholder="Role"
                  label="Role"
                  value={watch('role')}
                > */}
              {/* <MenuItem value="admin">Admin</MenuItem> */}
              {/* <MenuItem value="user">User</MenuItem> */}
              {/* </Select> */}
              {/* </FormControl> */}
              <FormInputField
                name="email"
                label="Email *"
                type="email"
                placeholder="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconEmail color={isError("email")} />
                    </InputAdornment>
                  ),
                }}
              />
              <ImageUploader image={image} uploadFile={uploadFile} />
              <Button variant="contained" data-testid="reset-password-button"  onClick={() => resetPassword()}>
                Reset Password
              </Button>
              <Button variant="contained" data-testid="edit" type="submit">
                Edit
              </Button>
            </Spacer>
          </FormProvider>
        </Spacer>
      </Page>
    </>
  )
}
