import React from 'react'
import { Grid, InputAdornment, Stack, useTheme } from '@mui/material'
import {
  IconAddress,
  IconBuilding,
  IconName,
  IconPin,
} from '../../../config/icons.config'
import { FormInputField } from '../../../component/Form'
import ImageUploader from '../../admin/profile/UploadImage'

//company detail form & sets image
export default function CompanyDetailsStepForm(props: any) {
  const theme = useTheme()
  const { isError, setError } = props
  const [image, setImage] = React.useState()

  const uploadFile = async (data: any) => {
    setImage(data)
    props.setProfileImage(data)
    setError('profile', "")
  }
 
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ImageUploader
          image={props.profileLocal}
          displayButton={false}
          uploadFile={uploadFile}
          required
        />
        <div style={{ color: "red" }}>
          {!!props?.errors &&
            !!props?.errors?.profile &&
            props?.errors?.profile?.message}
        </div>
      </Grid>
      <Grid item xs={12}>
        <FormInputField
          label="Company Name"
          name="companyname"
          placeholder="Company Name"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconName color={isError('companyname')} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <FormInputField
            label="Address Line 1"
            name="company_address_1"
            placeholder="Address Line 1"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconAddress color={isError('company_address_1')} />
                </InputAdornment>
              ),
            }}
          />
          <FormInputField
            label="Address Line 2"
            name="company_address_2"
            placeholder="Address Line 2"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconAddress color={isError('company_address_2')} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <FormInputField
            label="State"
            name="company_state"
            placeholder="State"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_state')} />
                </InputAdornment>
              ),
            }}
          />
          <FormInputField
            label="City"
            name="company_city"
            placeholder="City"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_city')} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2}>
          <FormInputField
            label="Country"
            name="company_country"
            placeholder="Country"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_country')} />
                </InputAdornment>
              ),
            }}
          />
          <FormInputField
            label="Postal Code"
            name="company_postal_code"
            placeholder="Postal Code"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconPin color={isError('company_postal_code')} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
