import { keyframes, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../component";
import { IconPaymentSuccess } from "../../../config/icons.config";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import paymentService from "../../../services/payment.service";

const PaymentSuccessAnimation = keyframes`
    from {
    transform: rotate(0deg);
    }
    to {
    transform: rotate(360deg);
    }
`;

const StyledPaymentSuccessIcon = styled(IconPaymentSuccess)(({ theme }) => ({
  color: theme.palette.success.main,
  height: 60,
  width: 60,
  animation: `${PaymentSuccessAnimation} 3s ${theme.transitions.easing.easeInOut}`,
}));
//After adding all details of users in stripe it checks whether it was successful or not
async function getStripePaymentURI({ token, sessionID,type}) {
  const { message, isError } = await paymentService.successPayment({token,sessionID,type});
  if (!isError) {
    toast.success(message)

  } else {
    toast.error(message)
  }
}

// if payment is successful it navigates to login page after clicking on login button
function PaymentSuccess() {
  const navigate = useNavigate();

  function handleLoginNavigation() {
    localStorage.removeItem("user_auth_token");
    navigate("/", { replace: true });
  }
  useEffect(() => {
    const token = localStorage.getItem("user_auth_token")
    const url = new URL(window.location.href);
    const sessionID = url.searchParams.get("session_id");
    const type = url.searchParams.get("type");
    if (!!token && !!sessionID && !!type) {
      getStripePaymentURI({ token,sessionID,type});
    } 
    else
    {
      toast.error("error")
      }
  }, []);

  return (
    <Stack
      spacing={3}
      alignItems="center"
      marginTop={3}
      justifyContent="center"
    >
      <StyledPaymentSuccessIcon />
      <Typography variant="h2" color="primary">
        Payment Successfull
      </Typography>
      <Button variant="contained" onClick={handleLoginNavigation}>
        Go to login{" "}
      </Button>
    </Stack>
  );
}

export default PaymentSuccess;
