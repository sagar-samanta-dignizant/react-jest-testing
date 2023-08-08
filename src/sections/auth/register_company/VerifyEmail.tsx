import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@mui/system'
import OtpInput from 'react-otp-input'
import { useAuth } from '../../../hooks/useAuth'
import { IOtpData } from '../../../types'
import { FormProvider } from '../../../component/Form'
import { otpSchema } from '../../../schema'
import { defaultValuesOtp } from '../DefaultFormData'
import Spacer from '../../../component/Spacer'
import { Button } from '../../../component'
import { useForm } from 'react-hook-form'

function VerifyEmail() {
  const theme = useTheme()
  const { otpEmailVerify, resendOTP } = useAuth()
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
    otpEmailVerify(data.otp)
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
          Verify Email
        </Button>
        <Button onClick={() =>  resendOTP()} id="ResendOTP">Resend Email CODE</Button>
      </Spacer>
      </FormProvider>
 
  )
}

export default VerifyEmail;
