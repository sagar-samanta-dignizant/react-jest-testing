
import { Box } from '@mui/material'
import Spacer from '../../component/Spacer';
import OtpInput from 'react-otp-input'
import { Button } from '../../component';
import { FormProvider } from '../../component/Form';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { otpSchema } from '../../schema';
import { defaultValuesOtp } from '../../sections/auth/DefaultFormData';
import { useTheme } from '@mui/system'
import { IOtpData } from '../../types';
import authService from '../../services/auth.service';
import { toast } from 'react-hot-toast';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
 
 
  // this function helps to update subscription updating on behalf of yes or no page.
export default function VerifyEmailAdmin(props) {
   const [page, setPage] = React.useState();
    const theme = useTheme()
   
    const { onSuccessClose } = props;

    const onAddUser = async (data) => {
      if (data) {
        onSuccessClose(data)
      } else {
        onSuccessClose(data)
      }
  
    };
    const methods = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: defaultValuesOtp
      })
      
    const handleChange = (otp: IOtpData) => {
        methods?.setValue('otp', otp)
      }


    const onSubmit = async (otp) => {
      debugger
        const {isError , message, res} = await authService.verificationEmail(
          otp,
        );
        // const res = await response.json();
        console.log(res);
    
        if (!isError) {
          const existingUser = JSON.parse(localStorage.getItem("user"));
          localStorage.setItem("user", JSON.stringify({
            ...existingUser,
            is_email_verify: true
          }));
          onAddUser(true);
          toast.success(message);
        } else 
        {
          toast.error(message);
        }
      };
     
  return (
    <>
      <Box title="Users" sx={style}>
       <FormProvider methods={methods} onSubmit={methods?.handleSubmit(onSubmit)}>
      <Spacer>
        <OtpInput
          value={methods?.watch('otp')}
          onChange={handleChange}
          numInputs={6}
          className= "otpForm"
          data-testid='otp-input'
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
        {/* <Button onClick={() =>  otpEmailVerify()} id="ResendOTP">Resend Email CODE</Button> */}
      </Spacer>
      </FormProvider>
      </Box>
    </>
  )
}
