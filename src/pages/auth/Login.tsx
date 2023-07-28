import { Alert } from '@mui/material'
import { Title } from '../../component'
import Spacer from '../../component/Spacer'
import { LoginForm } from '../../sections/auth'

//login page 
const Login = () => {
  return (
      <Spacer justifyContent="center" width="30rem" padding="1rem">
        <Title>Admin Panel Login</Title>

      <Alert severity="info" icon={false} className="email-helper-text">
          Use your email and password to login
        </Alert>
        <LoginForm />
      </Spacer>
  )
}

export default Login
