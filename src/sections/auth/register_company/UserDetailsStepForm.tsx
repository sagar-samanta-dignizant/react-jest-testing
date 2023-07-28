import React, { useState } from 'react'
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from '@mui/material'
import {
  IconEmail,
  IconName,
  IconPassword,
  IconPasswordHidden,
  IconPasswordVisible,
  IconTelephone,
} from '../../../config/icons.config'
import { FormInputField } from '../../../component/Form'
import ImageUploader from '../../admin/profile/UploadImage'
import '../../../styles/main.css'
import { MuiTelInput } from 'mui-tel-input'

export default function UserDetailsStepForm(props: any) {
  const theme = useTheme()
  const { isError, setValue, watch, setError } = props
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [image, setImage] = React.useState()
//when user uploads the image this function sets the image and then send value through props
  const changePasswordState = () => setPasswordVisible((prev) => !prev)
  const uploadFile = async (data: any) => {
    setImage(data)
    props.setImage(data)
    setError('avatar', "")
  }

  return (

    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <ImageUploader
          uploadFile={uploadFile}
          image={props.imageLocal}
          displayButton={false}
        />
        <div style={{ color: "red" }}>
          {
            props?.errors?.avatar?.message}
        </div>
      </Grid>
      <Grid item xs={12}>
        <FormInputField
          label="Name"
          name="full_name"
          placeholder="Name"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconName color={isError('full_name')} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MuiTelInput
          fullWidth
          name="phone_no"
          value={watch('phone_no')}
          onChange={value => setValue('phone_no', value)}
          required
          placeholder="Mobile Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconTelephone color={isError('phone_no')} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormInputField
          label="Email"
          name="user_email"
          placeholder="Email"
          fullWidth
          id="user_email"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconEmail color={isError('user_email')} />
              </InputAdornment>
            ),
          }}
          disabled={props.isMailDisabled}
        />

      </Grid>

      <Grid item xs={12}>
        <FormInputField
          label="Display Name"
          name="display_name"
          placeholder="Display Name"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconName color={isError('display_name')} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

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
                      <IconPasswordHidden color={isError('confirm_password')} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
