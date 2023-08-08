import { IconButton, InputAdornment, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../component'
import { FormInputField, FormProvider } from '../../component/Form'
import {
  IconEmail,
  IconLogin,
  IconName,
  IconPassword,
  IconPasswordHidden,
  IconPasswordVisible,
} from '../../config/icons.config'
import { AUTH_ROUTES } from '../../config/routes.config'
import { useAuth } from '../../hooks/useAuth'

import { yupResolver } from '@hookform/resolvers/yup'
import FormCheckbox from '../../component/Form/FormCheckbox'
import Spacer from '../../component/Spacer'
import { loginSchema } from '../../schema'
import { ILoginFormData } from '../../types'
import { defaultValuesLogin } from './DefaultFormData'

//this form consists for multiple hooks and method like navigate use for navigation auth to use login data which is degined on another page
function LoginForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const { login } = useAuth()
  
  //helps in validating form
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: defaultValuesLogin
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: ILoginFormData) => {
    debugger
    login(data)
  }

  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main

  return (
    <FormProvider data-testId='login-form' methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Spacer>
      <FormInputField
          name="Companyname"
          label="Company name {optional}"
          type="text"
          className="email-helper-text"
          placeholder="companyname"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconName  />
              </InputAdornment>
            ),
          }}
        />

        <FormInputField
          name="email"
          label="Email*"
          type="email"
          className="email-helper-text"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconEmail color={isError('email')} />
              </InputAdornment>
            ),
          }}
        />

        <FormInputField
          name="password"
          label="Password*"
          placeholder="Password"
          className="email-helper-text"
          type={isPasswordVisible ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconPassword
                  color={isError('password')}
                  className="pass_icon"
                />
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
        <FormCheckbox
          name="remember_me"
          label="Remember Me"
          className="email-helper-text"
        />

        <Button
          startIcon={<IconLogin className="login_icon" />}
          variant="contained"
          type="submit"
          className="email-helper-text"
        >
          Login
        </Button>
        <Button
          onClick={() => navigate(AUTH_ROUTES.forgetPassword)}
          data-testid="forget-password-button"
          id="resetPasswordBtn"
          className="email-helper-text"
        >
          Forget Password?
        </Button>
        <Button
          onClick={() => navigate(AUTH_ROUTES.NewUser)}
          id="registerNewUser"
          test-dataId='registerNewUser'
          className="email-helper-text"
        >
          Register as new Company
        </Button>
      </Spacer>
    </FormProvider>
  )
}

export default LoginForm














