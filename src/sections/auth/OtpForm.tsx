import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@mui/system'
import OtpInput from 'react-otp-input'
import { FormProvider } from '../../component/Form'
import Spacer from '../../component/Spacer'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { Button } from '../../component'
import { otpSchema } from '../../schema'
import { AUTH_ROUTES } from '../../config/routes.config'
import { useNavigate } from 'react-router-dom'
import { IOtpData } from '../../types'
import {  defaultValuesOtp } from './DefaultFormData'

function OtpForm() {
  const theme = useTheme()
  const { otpVerify, resendOTP } = useAuth()
  let navigate = useNavigate()
// setvalue of OTp and send it through Auth
  const handleChange = (otp: IOtpData) => {
    setValue('otp', otp)
  }
  //validate otp on based of condition
  const methods = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: defaultValuesOtp
  })

  const { handleSubmit, setValue, watch } = methods

  const onSubmit = (data: any) => {
    otpVerify(data.otp)
  }

//navigate when condition is true
  const goReset2FactorAuthentication = () => {
    navigate(AUTH_ROUTES.resetFactorAuthentication, { replace: true })
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Spacer>
        <OtpInput
          value={watch('otp')}
          onChange={handleChange}
          numInputs={6}
          className= "otpForm"
          inputStyle={{
            width: ' 2em',
            height: ' 2em',
            textAlign: 'center',
            border: `2px solid ${theme?.palette?.primary?.main}`,
            borderRadius: '5px',
            fontSize: '20px',
          }}
          containerStyle={{
            justifyContent: 'center',
            columnGap: '1rem',
          }}
        />
         
        <Button variant="contained" type="submit" className='otp-Page'>
          Verify
        </Button>
        <Button onClick={() =>  resendOTP()} id="ResendOTP">Resend SMS CODE</Button>
        <Button onClick={goReset2FactorAuthentication}>
          Reset 2 Factor Authentication
        </Button>
      </Spacer>
      </FormProvider>
 
  )
}

export default OtpForm
