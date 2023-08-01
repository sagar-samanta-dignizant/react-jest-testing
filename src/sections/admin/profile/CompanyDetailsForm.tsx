import { Grid, InputAdornment, Stack, useTheme } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../component'
import { FormInputField, FormProvider } from '../../../component/Form'
import {
  IconAddress,
  IconBuilding,
  IconPin,
} from '../../../config/icons.config'
import CompanyDetailsSchema from '../../../schema/CompanyDetails.schema'
import { TCompanyDetailsFormData } from '../../../types/adminSetting/companyDetailsType'
import ImageUploader from './UploadImage'
import { yupResolver } from '@hookform/resolvers/yup'
import settingsService from '../../../services/settings.service'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { defaultValuesFormData } from './DefaultDataProfile'
import { decrypt, encrypt } from '../../auth/register_company/Encrypt&Decrypt'


export default function CompanyDetailsFormBk(props: any) {
  const navigate = useNavigate();
  const [image, setImage] = React.useState(null);
  const { user } = useAuth()

  // sets image in company detail page
  const getProfile = async () => {
    const formData = new FormData()
    formData.append('companyId', user.companyId)
    const profile = await settingsService.getProfile(user.companyId?._id, "company");
    setImage(profile);
  };

// this useEffect checks whether session is having user data if it does not have just clears the data and take user to login page
  React.useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      window.location.reload();
      navigate("/", { replace: true });
    }
    getCompanyDetails();
    getProfile();
  }, [])

  // setValue of company details like address, country & code
  const getCompanyDetails = async () => {
    debugger
    const res: any = await settingsService.getCompany();
    if (res.isError) {
      toast.error(res.message)
    }   
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)
    setValue('companyId', res.companyData._id);
    setValue('companyname', decrypt(master_key, res.companyData.name_encrypted))
    setValue('company_address_1', decrypt(master_key, res.companyData.address_1))
    setValue('company_address_2', decrypt(master_key, res.companyData.address_2))
    setValue('company_state', decrypt(master_key, res.companyData.state))
    setValue('company_city',decrypt(master_key, res.companyData.city))
    setValue('company_country', decrypt(master_key, res.companyData.country))
    setValue('company_postal_code', decrypt(master_key, res.companyData.postal_code)) 
    setImage(res.companyData.avatar)
  }
     // yupResolver helps in validation
  const methods = useForm({
    resolver: yupResolver(CompanyDetailsSchema),
    defaultValues: defaultValuesFormData
  })

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  // onSubmit user lastest data will be uploaded
  const onSubmit = async (data: TCompanyDetailsFormData) => {
    debugger
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)
    let encrptCompanyAddress = encrypt(master_key, data.company_address_1).encrypted
    let encrptCompanyAddress2 = encrypt(master_key, data.company_address_2).encrypted
    let encrptCompanyName = encrypt(master_key, data.companyname).encrypted
    let encrptCompanyCity = encrypt(master_key, data.company_city).encrypted
    let encrptCompanyCountry = encrypt(master_key, data.company_country).encrypted
    let encrptCompanyState = encrypt(master_key, data.company_state).encrypted
    let encrptCompanyPostalCode = encrypt(master_key, data.company_postal_code).encrypted
   
    const requestBody = {
      company_name_encrypted: encrptCompanyName,
      company_address_1: encrptCompanyAddress,
      company_address_2: encrptCompanyAddress2,
      company_state: encrptCompanyState,
      company_city: encrptCompanyCity,
      company_country: encrptCompanyCountry,
      company_postal_code: encrptCompanyPostalCode,

    };
    
    // const formData = new FormData() 
    // formData.append('company_name_encrypted', encrptCompanyName)
    // formData.append('company_address_1', encrptCompanyAddress)
    // formData.append('company_address_2', encrptCompanyAddress2)
    // formData.append('company_state', encrptCompanyState)
    // formData.append('company_city', encrptCompanyCity)
    // formData.append('company_country', encrptCompanyCountry)
    // formData.append('company_postal_code', encrptCompanyPostalCode)
    delete data.companyname;
    delete data.companyId;
    const { isError, message } = await settingsService.editCompanyDetails(
      requestBody,
    )
    if (!isError) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
// when user tries to upload new image upload image functions help in doing the task
  const uploadFile = async (data: any) => {
    debugger
    const formdata = new FormData();
    formdata.append("companyFile", data[0]);
    console.log(data);
    const { isError, message } = await settingsService.updateAdminProfile(
      formdata
    );
    if (!isError) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
//isError prompts error when user put any wrong field
  const theme = useTheme()
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormInputField
            name="companyname"
            label="company name "
            type="text"
            placeholder="company name"
            required
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconAddress color={isError('companyname')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_address_1"
            label="Address Line 1 "
            type="text"
            placeholder="Address Line 1"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconAddress color={isError('company_address_1')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_address_2"
            label="Address Line 2"
            type="text"
            placeholder="Address Line 2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconAddress color={isError('company_address_2')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_state"
            label="State *"
            type="text"
            placeholder="State"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_state')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_city"
            label="City *"
            type="text"
            placeholder="City"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_city')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_country"
            label="Country *"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconBuilding color={isError('company_country')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="company_postal_code"
            label="Postal Code *"
            type="text"
            placeholder="Postal Code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconPin color={isError('company_postal_code')} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ImageUploader
            name="profile"
            uploadFile={uploadFile}
            image={image}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Update Company Details
            </Button>
            <Button color="error">Cancel</Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
