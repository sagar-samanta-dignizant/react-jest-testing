import { Alert } from "@mui/material";
import { Page, Title } from "../../component";
import Spacer from "../../component/Spacer";
import { ResetFactorAuthenticationForm } from "../../sections/auth";

//Reset two factor page component imported
function ResetFactorAuthentication() {
  return (
    <Page title=" Reset 2 Factor Authentication">
      <Spacer justifyContent="center" width="30rem" padding="1rem">
        <Title marginBottom={5}>Reset 2 Factor Authentication</Title>
        <Alert severity="info" icon={false}>
          Use your email and password to reset 2 factor authentication
        </Alert>
        <ResetFactorAuthenticationForm />
      </Spacer>
    </Page>
  );
}

export default ResetFactorAuthentication;
