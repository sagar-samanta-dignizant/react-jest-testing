import { Alert } from "@mui/material";
import { Page, Title } from "../../component";
import Spacer from "../../component/Spacer";
import { OtpForm } from "../../sections/auth";

//otp page
function Otp() {
  return (
    <Page title="otp">
      <Spacer justifyContent="center" width="30rem" padding="1rem">
        <Title>Enter Valid OTP</Title>
        <Alert severity="info" className='otp-Page' icon={false}>
          Use your SMS CODE to Login
        </Alert>
        <OtpForm />
      </Spacer>
    </Page>
  );
}

export default Otp;
