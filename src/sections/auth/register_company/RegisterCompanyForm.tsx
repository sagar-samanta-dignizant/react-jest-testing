import {
  Icon,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useTheme,
} from '@mui/material'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../component'
import Login from '../../../pages/auth/Login'
import Page404 from '../../../pages/error/404'
import { RegisterSchema } from '../../../schema'
import { IRegisterCompanyFormData } from '../../../types'
import CompanyDetailsStepForm from './CompanyDetailsStepForm'
import UserDetailsStepForm from './UserDetailsStepForm'
import { FormProvider } from '../../../component/Form'
import {
  IconBuilding,
  IconUser,
} from '../../../config/icons.config'
import Spacer from '../../../component/Spacer'
import { useNavigate } from 'react-router-dom'
import { defaultValues } from './RegisterCompanyData'
import { decrypt, encrypt, getKey, singleHash } from './Encrypt&Decrypt'
import authService from '../../../services/auth.service'
import { toast } from 'react-hot-toast'

const steps = ['Company Details', 'User details']
//this function checks whether data is companyDetailstepform or AdminDetailsStepForm so it collects data accordingly
function _renderStepContent({
  step,
  isError,
  setImage,
  setProfileImage,
  imageLocal,
  profileLocal,
  setValue,
  watch,
  errors,
  setError
}) {
  switch (step) {
    case 0:
      return (
        <CompanyDetailsStepForm
          isError={isError}
          setProfileImage={setProfileImage}
          profileLocal={profileLocal}
          errors={errors}
          setError={setError}
        />
      )
    case 1:
      return (
        <UserDetailsStepForm
          isError={isError}
          setImage={setImage}
          imageLocal={imageLocal}
          setValue={setValue}
          watch={watch}
          errors={errors}
          setError={setError}
        />
      )

    default:
      return <Page404 />
  }
}

//ColorlibStepIconRoot in this variable styling is defined in it.
const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed; active }
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.dark,
  }),
}))

function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <IconBuilding />,
    2: <IconUser />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <Icon>{icons[String(props.icon)]}</Icon>
    </ColorlibStepIconRoot>
  )
}

const StepFormConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.dark,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

function RegisterCompanyForm() {
  const theme = useTheme()
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0)
  const [imageLocal, setImageLocal] = useState('')
  const [profileLocal, setProfileLocal] = useState('')
  const isUserStep = activeStep === 0

  const isRegisterCompanyStep = activeStep === 1

  // helps for validating admin form
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
    setError,

  } = methods

  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main


  const onSubmit = async (data: IRegisterCompanyFormData) => {
    debugger
    const hashedPassword = singleHash(data.password);
    console.log(hashedPassword)
    const hashedCompanyName = singleHash(data.companyname);
    const hashedDisplayName = singleHash(data.display_name);
    
    const firstFiveLettersOfPassword = data.password.slice(0, 5);
    const hashedWithFirstFiveLetters = data.password + firstFiveLettersOfPassword;
    const model_password = singleHash(hashedWithFirstFiveLetters);
    console.log("md", model_password)
    let master_key = getKey();
     console.log(master_key);
    let master_seed = encrypt( hashedPassword,  master_key).encrypted
    console.log("master",master_seed);
    let encrptCompanyAddress = encrypt(master_key, data.company_address_1).encrypted
    let encrptCompanyAddress2 = encrypt(master_key, data.company_address_2).encrypted
    let encrptFullName = encrypt(master_key, data.full_name).encrypted
    let encrptCompanyCity = encrypt(master_key, data.company_city).encrypted
    let encrptCompanyCountry = encrypt(master_key, data.company_country).encrypted
    let encrptCompanyState = encrypt(master_key, data.company_state).encrypted
    let encrptCompanyPostalCode = encrypt(master_key, data.company_postal_code).encrypted
    let encrptCompanyName = encrypt(master_key, data.companyname).encrypted
    let encrptPassword = encrypt(master_key, data.password).encrypted
    let encrptPhoneNo = encrypt(master_key, data.phone_no).encrypted
    let encrptConfirmPassword = encrypt(master_key, data.confirm_password).encrypted
    let encrptDisplayName = encrypt(master_key, data.display_name).encrypted
    let decyptCompanyAddress = decrypt(master_key, encrptCompanyAddress)
    let decyptCompanyAddress2 = decrypt(master_key, encrptCompanyAddress2)

    const formData = new FormData() 
    formData.append('company_name_encrypted', encrptCompanyName)
    formData.append('company_address_1', encrptCompanyAddress)
    formData.append('company_address_2', encrptCompanyAddress2)
    formData.append('company_state', encrptCompanyState)
    formData.append('company_city', encrptCompanyCity)
    formData.append('company_country', encrptCompanyCountry)
    formData.append('company_postal_code', encrptCompanyPostalCode)
    formData.append('full_name', encrptFullName)
    formData.append('user_email', data.user_email)
    formData.append('password', hashedPassword);
    formData.append('confirm_password', hashedPassword);
    formData.append('companyFile', data.profile)
    formData.append('userFile', data.avatar)
    formData.append('display_name_encrypted', encrptDisplayName)
    formData.append('phone_no', encrptPhoneNo)
    formData.append('master_seed', master_seed)
    formData.append('model_password', model_password)
    formData.append('display_name', hashedDisplayName)
    formData.append('companyname', hashedCompanyName)
    const { isError, message, token } = await authService.register(formData)
 
    if (!isError) {
      debugger
      toast.success(message)
      const userJSON = JSON.stringify(token);
      localStorage.setItem('user', userJSON)
      setTimeout(() => navigate('/payment'), 500)
    } else {
      toast.error(message)
    }
  }

  const setImage = (data) => {
    setValue('avatar', data[0])
    setImageLocal(data)
  }

  const setProfileImage = (data) => {
    setValue('profile', data[0])
    setProfileLocal(data)
  }

  //when next button is clicked error triggers whether the form details are filled it or not.
  const _handleNext = async (e) => {
    e.preventDefault()
    const triggerValue = await trigger(["companyname", "profile", "company_address_1", 'company_state', 'company_city', 'company_country', 'company_postal_code'])
    if (triggerValue) {
      setActiveStep((prev) => prev + 1);
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Spacer className="register-user" justifyContent="center" width="30rem" padding="1rem">
        <Spacer m={3}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<StepFormConnector />}
          >
            {steps.map((label, idx) => (
              <Step key={label}>
                <StepLabel StepIconComponent={StepIcon}>
                  <Typography color={theme.palette.primary.main}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Spacer>
        <Spacer>
          {activeStep === steps.length ? (
            <Login />
          ) : (
            _renderStepContent({
              step: activeStep,
              isError,
              setImage,
              setProfileImage,
              imageLocal,
              profileLocal,
              setValue,
              watch,
              errors,
              setError,

            })
          )}
        </Spacer>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button
            variant="text"
            id='BackButton'
            name='BackButton'
            size="large"
            fullWidth
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          {isUserStep ? (
            <Button
              variant="contained"
              id='NextButton'
              size="large"
              fullWidth
              className='register-user'
              onClick={(e) => {
                _handleNext(e);
              }}
            >
              Next
            </Button>
          ) : null}
          {isRegisterCompanyStep ? (
            <Button variant="contained" size="large" fullWidth type="submit">
              Register Company
            </Button>
          ) : null}
        </Stack>
      </Spacer>
    </FormProvider>
  )
}

export default RegisterCompanyForm
