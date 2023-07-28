import { Alert } from "@mui/material";
import { Page, Title } from "../../component";
import Spacer from "../../component/Spacer";
import {FormKey } from "../../sections/auth"

//key page after 2 factor reset password 
function Key() {
    return (
        <Page title="Login">
            <Spacer justifyContent="center" width="30rem" padding="1rem">
                <Title>Enter Valid Key</Title>

                <Alert severity="info" icon={false}>
                    Enter Key from your mail
                </Alert>
                <FormKey />
            </Spacer>
        </Page>
    );
}

export default Key;
