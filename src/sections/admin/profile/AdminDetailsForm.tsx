import { Grid, InputAdornment, Stack, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "../../../component";
import {
  IconEmail,
  IconName,
  IconTelephone,
} from "../../../config/icons.config";
import { TAdminDetailsFormData } from "../../../types/adminSetting/adminDetailsType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ImageUploader from "./UploadImage";
import AdminDetailsSchema from "../../../schema/AdminDetails.schema";
import { FormInputField, FormProvider } from "../../../component/Form";
import settingsService from "../../../services/settings.service";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import { defaultValuesAdmin } from '../profile/DefaultDataProfile'
import { decrypt, encrypt } from "../../auth/register_company/Encrypt&Decrypt";

export default function AdminDetailsForm(props) {
  // this useEffect checks whether session is having user data if it does not have just clears the data and take user to login page
  const [image, setImage] = React.useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    const users = localStorage.getItem('user')
    if (!users) {
      // window.location.reload();
      navigate("/", { replace: true })
    }
    getAdminDetails();
    getProfile();
  }, [props]);

  // settingUp values of Admin in company details page
  const getAdminDetails = async () => {
    const res: any = await settingsService.getOwnDetails();
    if (res.isError) {
      toast.error(res.message)
    }
    
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)

    setValue("full_name",  decrypt(master_key, res.userData.full_name));
    setValue("email", res.userData.email);
    setValue("mobile_no",  decrypt(master_key, res.userData.phone_no));
    setImage(res.userData.avatar)
  }

  // get profile image for admin 
  const getProfile = async () => {
    const formData = new FormData()
    formData.append('companyId', user?.companyId)
    const profile: any = await settingsService.getAdminPicture(user?.companyId?._id, "company");
    setImage(profile);
  };

  // yupResolver helps in validation
  const methods = useForm({
    resolver: yupResolver(AdminDetailsSchema),
    defaultValues: defaultValuesAdmin,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  //// collects user data & sends to database
  const onSubmit = async (data: TAdminDetailsFormData) => {
    debugger
    const headset_key = JSON.parse(localStorage.getItem("user"))?.headset_key;
    const model_key = JSON.parse(localStorage.getItem("user"))?.model_key;
    const model_password = JSON.parse(localStorage.getItem("user"))?.model_password;
    const  intermitent_key = encrypt( model_key, model_password).encrypted
    const master_key = decrypt(intermitent_key, headset_key)
    let fullName_encrypted = encrypt(master_key, data.full_name).encrypted
    let encrptPhoneNo = encrypt(master_key, data.mobile_no).encrypted
    
    const requestBody = {
      full_name: fullName_encrypted,
      phone_no: encrptPhoneNo
    };
    
    const { isError, message } = await settingsService.editUser(requestBody);
    if (!isError) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // uploads profile picture when updated inside admin panel or user panel
  const uploadFile = async (data: any) => {
    debugger
    const formdata = new FormData();
    formdata.append("userFile", data[0]);

    const { isError, message } = await settingsService.editAdminProfile(
      formdata,
      // user._id
    );
    if (!isError) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  //isError prompts error when user put any wrong field
  const theme = useTheme();
  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormInputField
            name="full_name"
            label="Full Name *"
            type="text"
            placeholder="Full Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconName color={isError("full_name")} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="email"
            label="Email *"
            type="email"
            disabled
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconEmail color={isError("email")} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormInputField
            name="mobile_no"
            label="Mobile No *"
            type="text"
            placeholder="Mobile No"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconTelephone color={isError("mobile_no")} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ImageUploader uploadFile={uploadFile} image={image} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" type="submit">
              Update Admin Details
            </Button>
            <Button color="error">Cancel</Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
