import { Page, Title } from '../../component'
import { RegisterCompanyForm } from '../../sections/auth'
import { Alert } from '@mui/material'

//Register company page
export default function Register() {
  return (
    <Page title="Register Company">
      <Title paddingBottom={2} >Register Company</Title>
      <Alert className="register-user" severity="info" icon={false}>
        Add your company details 
      </Alert>
      <RegisterCompanyForm />
    </Page>
  )
}
