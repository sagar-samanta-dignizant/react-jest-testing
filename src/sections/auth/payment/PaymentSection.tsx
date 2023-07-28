import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, SectionContainer } from "../../../component";
import { FormProvider } from "../../../component/Form";
import Spacer from "../../../component/Spacer";
import { IconChecked } from "../../../config/icons.config";
import paymentSchema from "../../../schema/Payment.schema";
import paymentService from "../../../services/payment.service";
import { IPaymentProps } from "../../../types";
import { defaultValues } from "./paymentData";

function PaymentSection() {
  const navigate = useNavigate();
  const [checkoutURI, setCheckoutURI] = useState("");
  const [inputValue, setInputValue] = useState(5)
  const [input, setInput] = useState(5)
  const [coupon, setCoupon] = useState("")
  const [couponValid, setCouponValid] = useState(false);

  //useEffect check after rendering if token is there or not if not then navigate to login page
  useEffect(() => {
    const token = localStorage.getItem("user_auth_token");
    if (!token) {
      navigate("/", { replace: true });
    }
    if (coupon.length > 7) {
      const token = localStorage.getItem("user_auth_token");
      paymentService.verifyCoupon(token, {
        'coupon_id': coupon,
      }).then((responseData) => {
        setCouponValid(responseData?.is_valid_coupon);
      });
    }
  }, [coupon]);

// yupResolver helps in validation
  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: defaultValues
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  // onSubmit sends data of user like whether payment is montly or yearly he is used coupon for it or not what users he had selected
  const onSubmit = async (data: IPaymentProps) => {
    const token = localStorage.getItem("user_auth_token");
    const { url } = await paymentService.initiatePayment(token, {
      'type': data.plan,
      'coupon_id': coupon,
      'users': data.plan === 'monthly' ? inputValue : input
    });
    if (url) {
      setCheckoutURI(url);
      window.location.replace(url);
      navigate(url, { replace: true });
    }
  };

  const buttonWidth = '7rem';

  const handleAddUser = (event) => {
    event.preventDefault();
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <SectionContainer title="Monthly">
            <Spacer>
              <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                <SectionContainer title="$20 per user per month" subtitle="(fixed price) ">
                  <Spacer>
                    <Typography
                      color="success.main"
                      fontWeight={800}
                      sx={{
                        position: 'relative',
                        top: '-3rem',
                        left: '24rem',
                      }}
                    >
                      Active
                    </Typography>
                    <Typography color="darkorange" fontWeight={800}>
                      Number of users : {inputValue}
                    </Typography>
                    <form onSubmit={handleAddUser}>
                      <Stack direction="row" spacing={4}>
                        <TextField
                          value={inputValue}
                          sx={{
                            width: '15rem',
                          }}
                          inputProps={{
                            type: 'number',
                            min: 2,
                            name: 'userCount',
                          }}
                          onChange={handleInputChange}
                        />
                      </Stack>
                    </form>
                    <Typography color="darkorange" fontWeight={800}>
                      Cost : ${inputValue * 20}
                    </Typography>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      {watch("plan") === "monthly" ? (
                        <Button
                          variant="contained"
                          color="success"
                          name="select"
                          onClick={() => setValue("plan", "")}
                          
                          sx={{
                            width: buttonWidth,
                            backgroundColor: '#4caf50',
                            marginLeft: '4rem',
                            top: '-1rem'
                          }}
                          startIcon={<IconChecked />}
                        >
                          Selected
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                            onClick={() => setValue("plan", "monthly")}
                            
                          sx={{
                            width: buttonWidth,
                            marginLeft: '4rem',
                            top: '-1rem'
                          }}
                        >
                          Select
                        </Button>
                      )}
                    </Grid>
                  </Spacer>
                </SectionContainer>
              </Grid>
            </Spacer>
          </SectionContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <SectionContainer title="Yearly">
            <Spacer>
              <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                <SectionContainer title="$20 per user per month " subtitle="(2 months free) ">
                  <Spacer>
                    <Typography
                      color="success.main"
                      fontWeight={800}
                      sx={{
                        position: 'relative',
                        top: '-3rem',
                        left: '24rem',
                      }}
                    >
                      Active
                    </Typography>
                    <Typography color="darkorange" fontWeight={800}>
                      Number of users : {input}
                    </Typography>
                    <form onSubmit={handleAddUser}>
                      <Stack direction="row" spacing={4}>
                        <TextField
                          value={input}
                          sx={{
                            width: '15rem',
                          }}
                          inputProps={{
                            type: 'number',
                            min: 2,
                            name: 'userCount', 
                          }}
                          onChange={handleChange}
                        />
                      </Stack>
                    </form>
                    <Typography color="darkorange" fontWeight={800}>
                      Cost : ${(input * 20 * 10).toFixed(2)}
                    </Typography>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      {watch("plan") === "yearly" ? (
                        <Button
                          variant="contained"
                          name="selected"
                          color="success"
                          onClick={() => setValue("plan", "")}
                          sx={{
                            width: buttonWidth,
                            backgroundColor: '#4caf50',
                            marginLeft: '4rem',
                            top: '-1rem'
                          }}
                          startIcon={<IconChecked />}
                        >
                          Selected
                        </Button>
                      ) : (
                        <Button
                          variant="contained"

                          onClick={() => setValue("plan", "yearly")}
                          sx={{
                            width: buttonWidth,
                            marginLeft: '4rem',
                            top: '-1rem'
                          }}
                        >
                          Select
                        </Button>
                      )}
                    </Grid>
                  </Spacer>
                </SectionContainer>
              </Grid>
            </Spacer>
          </SectionContainer>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', width: '10rem' }}>
            <Spacer>
            </Spacer>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {
            !!watch("plan") ? <Button variant="contained" fullWidth size="medium" type="submit">
              Proceed with payment
            </Button> : <Button variant="contained" fullWidth size="medium" disabled>  Proceed with payment </Button>
          }
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default PaymentSection;
