import { useEffect, useState } from "react";
import { Grid, IconButton, InputAdornment, Stack } from "@mui/material";
import { useTheme } from "@mui/system";
import { useForm } from "react-hook-form";
import { Button } from "../../component";
import { FormInputField, FormProvider } from "../../component/Form";
import {
  IconEmail,
  IconName,
  IconPassword,
  IconPasswordHidden,
  IconPasswordVisible,
} from "../../config/icons.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetFactorAuthentication } from "../../schema";
import { IResetFactorAuthentication } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { defaultValuesReset } from "./DefaultFormData";

function ResetFactorAuthenticationForm() {
  const { keyLogin } = useAuth();
  const theme = useTheme();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const changePasswordState = () => setPasswordVisible((prev) => !prev);
 //validate form
  const methods = useForm({
    resolver: yupResolver(resetFactorAuthentication),
    defaultValues: defaultValuesReset,
  });
// if user not found navigate to login page this happen when session is expired

  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main;
  
  const onSubmit = async (data: IResetFactorAuthentication) => {
    keyLogin(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Stack spacing={2}>
           <FormInputField
          name="companyname"
          label="company name {optional}"
          type="text"
          className="email-helper-text"
          placeholder="companyname"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconName />
              </InputAdornment>
            ),
          }}
        />
          <FormInputField
            name="email"
            label="Email*"
            type="email"
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconEmail color={isError("email")} />
                </InputAdornment>
              ),
            }}
          />
          <FormInputField
            name="password"
            label="Password"
            placeholder="Password"
            fullWidth
            required
            type={isPasswordVisible ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconPassword color={isError("password")} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                    <IconButton size="small" onClick={changePasswordState}>
                    {isPasswordVisible ? (
                      <IconPasswordVisible color={isError("password")} />
                    ) : (
                      <IconPasswordHidden color={isError("password")} />
                    )}
                  </IconButton>
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
        id="reset-password"
      >
        Reset 2 Factor Authentication
      </Button>
    </FormProvider>
  );
}

export default ResetFactorAuthenticationForm;
