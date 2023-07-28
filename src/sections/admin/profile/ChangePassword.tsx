import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { Button } from '../../../component'
import {
  IconEmail,
  IconName,
  IconPasswordHidden,
  IconPasswordVisible,
} from '../../../config/icons.config'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormInputField, FormProvider } from '../../../component/Form'
import settingsService from '../../../services/settings.service'
import toast from 'react-hot-toast'
import { TChangePassword } from '../../../types/adminSetting/changePasswordType'
import ChangePasswordSchema from '../../../schema/ChangePassword.schema'
import { useNavigate } from 'react-router-dom'
import { defaultValuesPassword } from './DefaultDataProfile'
import CryptoJS from 'crypto-js';

export default function ChangePasswordForm(props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate();

// this useEffect checks whether session is having user data if it does not have just clears the data and take user to login page
  React.useEffect(() => {
    const users = localStorage.getItem('user')
    if(!users)
    {
      window.location.reload();
      navigate("/",{replace: true})
    }
  })

   // yupResolver helps in validation
  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: defaultValuesPassword
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  // changing password inside Admin Panel
  const onSubmit = async (data: TChangePassword) => {
    const hashedPassword = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(data.new_password)).toString(CryptoJS.enc.Hex); 
      const hashedConfirmPassword = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(data.confirm_password)).toString(CryptoJS.enc.Hex); 
      const payload = {
      password: hashedPassword,
      confirm_password: hashedConfirmPassword,
    }
    const user = JSON.parse(localStorage.getItem('user'))
    const { isError, message } = await settingsService.changePassword(
      payload,
      user._id,
    )
    if (!isError) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  //isError prompts error when user put any wrong field
  const theme = useTheme()
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main
    
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      { }
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="new_password"
            label="New Password *"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="New Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconName color={isError('new_password')} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small" onClick={() => setPasswordVisible((prev) => !prev)}>
                    {isPasswordVisible ? (
                      <IconPasswordVisible color={isError('password')} />
                    ) : (
                      <IconPasswordHidden color={isError('password')} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="confirm_password"
            label="Confirm Password *"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconEmail color={isError('confirm_password')} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small" onClick={() => setPasswordVisible((prev) => !prev)}>
                    {isPasswordVisible ? (
                      <IconPasswordVisible
                        color={isError('confirm_password')}
                      />
                    ) : (
                      <IconPasswordHidden color={isError('confirm_password')} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Change Password
            </Button>
            <Button color="error">Cancel</Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
