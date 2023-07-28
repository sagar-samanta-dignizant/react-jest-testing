import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, IconButton, InputAdornment, Stack } from '@mui/material'
import { useTheme } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { Page, Title } from '../../component'
import { FormInputField, FormProvider } from '../../component/Form'
import {
  IconPassword,
  IconPasswordHidden,
  IconPasswordVisible,
} from '../../config/icons.config'
import resetPass from '../../schema/ResetPass.schema'
import authService from '../../services/auth.service'
import { IResetPassword } from '../../types'
import CryptoJS from 'crypto-js';
import { singleHash } from '../../sections/auth/register_company/Encrypt&Decrypt'
//the component starts by importing the necessary packages and defining the state variables that will be used later. It then defines a defaultValues object and a useForm hook that will be used to handle the form data and validation.
export default function ResetPassword() {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [companyId, setCompanyId] = useState('')
  const [adminId, setAdminId] = useState('')

  const defaultValues: IResetPassword = {
    password: '',
    confirm_password: '',
    primaryId: '',
  }
  const methods = useForm({
    resolver: yupResolver(resetPass),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main

  //The useEffect hook is used to parse the query string from the URL and extract the company ID and admin ID values. The onSubmit function is used to handle the form submission and calls the authService.resetPassword function to reset the user's password.
  useEffect(() => {
    const data = location.search.split('&')

    data.map((obj) => {
      if (obj.startsWith('?')) {
        const a = obj.replace('?', '')
        const objData = a.split('=')
        setCompanyId(objData[1])
        setValue('primaryId', objData[1])
      }

      if (obj.includes('adminId')) {
        const objData = obj.split('=')
        setAdminId(objData[1])
      }
    })
  }, [])

  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const changePasswordState = () => setPasswordVisible((prev) => !prev)

  const onSubmit = async (data: IResetPassword) => {
    const firstFiveLettersOfPassword = data.password.slice(0, 5);
    const hashedWithFirstFiveLetters = data.password + firstFiveLettersOfPassword;
    const model_password = singleHash(hashedWithFirstFiveLetters);
    const hashedPassword = singleHash(data.password);
    const payload = {
      ...data,
      model_password,
      password: hashedPassword,
      confirm_password: hashedPassword
    }
    const { isError, message } = await authService.resetPassword(payload)
    if (!isError) {
      toast.success(message)
      navigate('/login')
    } else {
      toast.error(message)
    }
  }

  //the input fields are wrapped in a Stack component, and the InputAdornment and IconButton components are used to display icons for showing and hiding the password
  return (
    <Page title="Reset Password">
      <Title marginBottom={5} id="Reset-password">
        Reset Password
      </Title>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <FormInputField
              name="password"
              label="Password"
              placeholder="Password"
              fullWidth
              required
              type={isPasswordVisible ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconPassword color={isError('password')} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={changePasswordState}>
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
            <FormInputField
              label="Confirm Password"
              name="confirm_password"
              placeholder="Confirm Password"
              type={isPasswordVisible ? 'text' : 'password'}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconPassword color={isError('confirm_password')} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={changePasswordState}>
                      {isPasswordVisible ? (
                        <IconPasswordVisible
                          color={isError('confirm_password')}
                        />
                      ) : (
                        <IconPasswordHidden
                          color={isError('confirm_password')}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
        <Button
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{ marginTop: '15px' }}
          id="reset-password"
        >
          Reset Password
        </Button>
      </FormProvider>
    </Page>
  )
}
