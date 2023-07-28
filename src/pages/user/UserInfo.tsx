import {
  Grid,
  InputAdornment,
  Stack,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormInputField, FormProvider } from '../../component/Form'
import {
  IconEmail,
  IconName,
} from '../../config/icons.config'
import { Button } from '../../component'
import settingsService from '../../services/settings.service'
import { TUserProfileFormData } from '../../types/userProfile'
import AdminDetailsSchema from '../../schema/AdminDetails.schema'
import ImageUploader from '../../sections/admin/profile/UploadImage'
import { useNavigate } from 'react-router-dom'
import { defaultValues } from './userData'
import { decrypt, encrypt } from '../../sections/auth/register_company/Encrypt&Decrypt'

export default function UserInfo(props) {
  const navigate = useNavigate();
  const [image, setImage] = React.useState()

  const getAdminDetails = async () => {
    const res: any = await settingsService.getOwnDetails();
    if (res.isError) {
      toast.error(res.message)
    }
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)
    setValue("full_name",  decrypt(master_key, res.userData.full_name));
    setValue("email", res.userData.email);
    setImage(res.userData.avatar)
  }
  // It first checks whether there is a user object in the localStorage. If there is none, it navigates to the homepage by calling navigate function with the path argument and setting the replace option to true. This will replace the current URL in the browser history with the new one, so the user cannot go back to the protected page after logging out.
  React.useEffect(() => {
    debugger
    const user = JSON.parse(localStorage.getItem('user'))
     if(!user){
      window.location.reload();
      navigate("/", { replace: true });
     }
    // if (props.selectedId && props.selectedId !== '') {
    //   const selectedUser = props.rows.filter(
    //     (obj: any) => obj.id === props.selectedId,
    //   )
    //   setValue('full_name', decrypt(master_key, selectedUser[0].full_name))
    //   setValue('email', selectedUser[0].email)
    // } else {
      
    //   setValue('full_name', decrypt(master_key, user.full_name ))
    //   setValue('email', user.email)
    // }
    getAdminDetails();
  }, [props])

  // handles the error 
  const methods = useForm({
    resolver: yupResolver(AdminDetailsSchema),
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  //collects user data & sends to database
  const onSubmit = async (data: TUserProfileFormData) => {
    debugger
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)
    const user = JSON.parse(localStorage.getItem('user'))
    let fullName_encrypted = encrypt(master_key, data.full_name).encrypted
    const requestBody = {
      full_name: fullName_encrypted
    }
    const { isError, message } = await settingsService.editUser(requestBody)
    if (!isError) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  // this is an API which updates the image
  
  const uploadFile = async (data: any) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const formdata = new FormData()
    formdata.append('userFile', data[0])

    const { isError, message } = await settingsService.editAdminProfile(
      formdata,
      user._id,
    )
    if (!isError) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const theme = useTheme()
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main

    const timeoutId = setTimeout(() => {
      const profile:any = localStorage.getItem('userImage');
      setImage(profile)
       return () => clearTimeout(timeoutId);
    }, 1000); // update after 1 second
   
    // a function that sends the updated user data to the server and displays a success or error message (onSubmit)
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormInputField
            name="full_name"
            label="Full Name"
            type="text"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconName color={isError('full_name')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="email"
            label="Email"
            type="email"
            disabled
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconEmail color={isError('email')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}></Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ImageUploader uploadFile={uploadFile} image={image} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Update User Details
            </Button>
            <Button color="error">Cancel</Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
