import { keyframes, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../component";
import {
  IconPaymentFail,
} from "../../../config/icons.config";

const PaymentFailAnimation = keyframes`
    from {
    transform: rotate(0deg);
    }
    to {
    transform: rotate(360deg);
    }
`;

const StyledPaymentFailIcon = styled(IconPaymentFail)(({ theme }) => ({
  color: theme.palette.error.main,
  height: 60,
  width: 60,
  animation: `${PaymentFailAnimation} 3s ${theme.transitions.easing.easeInOut}`,
}));

function PaymentFailed() {
  const navigate = useNavigate();

  function handleLoginNavigation() {
    localStorage.removeItem("user_auth_token");
    navigate("/", { replace: true });
  }

  // user has done successfull payement or cancelled payment it shows pop up
  return (
    <Stack
      spacing={3}
      alignItems="center"
      marginTop={3}
      justifyContent="center"
    >
      <StyledPaymentFailIcon />
      <Typography variant="h2" color="primary">
        Payment Failed
      </Typography>
      <Button variant="contained" onClick={handleLoginNavigation}>
        Go to login{" "}
      </Button>
    </Stack>
  );
}

export default PaymentFailed;
