import { InputAdornment, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../component";
import { IconEmail, IconName } from "../../config/icons.config";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "../../schema";
import { FormInputField, FormProvider } from "../../component/Form";
import { AUTH_ROUTES } from "../../config/routes.config";
import Spacer from "../../component/Spacer";
import authService from "../../services/auth.service";
import { toast } from "react-hot-toast";
import { defaultValuesPassword } from "./DefaultFormData";
import { IResetPasswordData } from "../../types";
import { singleHash } from "./register_company/Encrypt&Decrypt";

function ForgetPasswordForm() {
  let company_name;
  const theme = useTheme();
  const navigate = useNavigate();

  // validate form using YupResolver hook
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: defaultValuesPassword,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.dark;

  // if user forgets passwords this function helps to change password
  const onSubmit = async (data: IResetPasswordData) => {
    if (data.companyname) {
      company_name = singleHash(data.companyname);
    }
    const respmessage = await authService.forgotPassword(
      data.email,
      company_name
    );
    const message = respmessage?.message || "";
    const isError = respmessage?.isError || "";

    debugger;
    if (!isError) {
      toast?.success(message);
      navigate(AUTH_ROUTES.login);
    } else {
      toast.error(message || "");
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Spacer>
        <FormInputField
          name="companyname"
          label="company name {optional} "
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
        <Button type="submit" variant="contained">
          Request Password Reset
        </Button>
        <Button
          onClick={() => navigate(AUTH_ROUTES.login)}
          id="loginPagebtn"
          className="ResetPassBtn"
        >
          Go to Login
        </Button>
      </Spacer>
    </FormProvider>
  );
}

export default ForgetPasswordForm;
