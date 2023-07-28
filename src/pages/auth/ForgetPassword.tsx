import { Alert } from '@mui/material'
import { Title, Page } from '../../component'
import Spacer from '../../component/Spacer'
import { ForgetPasswordForm } from '../../sections/auth'

//forgot password start page
const ForgetPassword = () => {
  return (
    <Page title="Forgot Password">
      <Spacer justifyContent="center" width="30rem" padding="1rem">
        <Title>Forgot Password</Title>
        <Alert severity="info" icon={false} className="ResetPassBtn"> 
          Use your email to reset password
        </Alert>
        <ForgetPasswordForm />
      </Spacer>
    </Page>
  )
}

export default ForgetPassword
