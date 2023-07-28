
import { Grid, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/system";
import { useForm } from "react-hook-form";
import { Button } from "../../component";
import { FormInputField, FormProvider } from "../../component/Form";
import {
    IconEmail,
} from "../../config/icons.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { keySchema } from "../../schema";
import { IKeyFactorAuthentication } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { defaultValuesKey } from "./DefaultFormData";

function FormKey() {
    const theme = useTheme(); 
    const { otpVerify } = useAuth();

    //helps in validating form
    const methods = useForm({
        resolver: yupResolver(keySchema),
        defaultValues:defaultValuesKey
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;
    //prompts error if user input is not proper
    const isError = (fieldname: string) =>
     errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main;
       
        // Reset 2 factor by adding key API
    const onSubmit = async (data: IKeyFactorAuthentication) => {
        otpVerify(data.key);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <FormInputField
                        name="key"
                        label="key"
                        type="text"
                        placeholder="key"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconEmail color={isError("key")} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
            <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                sx={{ marginTop: "15px" }}
            >
                Enter Valid Key
            </Button>
        </FormProvider>
    );
}

export default FormKey;
