import { useEffect } from "react";
import {
  Grid,
  Typography,
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  Divider,
} from "@mui/material";
import { Button, SectionContainer, Title } from "../../../component";
import Spacer from "../../../component/Spacer";
import { useState } from "react";
import settingsService from "../../../services/settings.service";
import { toast } from "react-hot-toast";
import paymentService from "../../../services/payment.service";
import CancelSubscription from "../user/CancelSubscription";
import ApproveSubscription from "../user/ApproveSubscription";
import FreeUser from "../user/FreeUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import paymentSchema from "../../../schema/Payment.schema";
import { IPaymentProps } from "../../../types";
import { IconChecked } from "../../../config/icons.config";
import { useNavigate } from "react-router-dom";
import { defaultValuesUser } from "./DefaultDataProfile";

export default function SubscriptionForm(props) {
  const navigate = useNavigate();
  const [Show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isopen, setIsOpen] = useState(null);
  const [freeOpen, setFreeOpen] = useState(null);
  const [success, setSuccess] = useState(false);
  const [succ, setSucc] = useState(false);
  const [OnSuccess, setOnSuccess] = useState(false);
  const [checkoutURI, setCheckoutURI] = useState("");
  const buttonWidth = "7rem";
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

  const [inputValue, setInputValue] = useState(5);
  const [input, setInput] = useState(5);
  const [value, setVal] = useState("");
  const [date, setDate] = useState();
  const [inputVal, setInputVal] = useState(5);

  const [plan, setPlan] = useState("");
  const [users, setUsers] = useState(0);

  /// Cancle Subscription or Re-Active
  const [cancel, setCancel] = useState(false);
  const [cancelApprove, setCancelApprove] = useState(false);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const handleCancel = async () => {
    handleOpen();
  };
  const [freeChange, setFreeChange] = useState(false);

  //if someone is restarting the subscription
  const handleRestart = async () => {
    const res: any = await paymentService.cancelReactive();
    if (res.isError) {
      toast.error(res.message);
    }
    setCancel(res.userData.cancel_at_period_end);
  };

  const handleAddUser = (event) => {
    event.preventDefault(); // prevent default form submission behavior
  };

  const handleInputChange = (e) => {
    if (e.target.name === "monthly") {
      setInputValue(e.target.value);
    } else {
      setInput(e.target.value);
    }
  };

  const handleInputFree = (event) => {
    setInputVal(event.target.value);
    console.log(inputValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = async (ctx) => {
    if (ctx) {
      const res = await paymentService.cancelSubscription();
      if (res.isError) {
        toast.error(res.message);
      }
      setOpen(false);
      setCancel(true);
    }
  };

  //set values accordingly load form of monthly and yearly
  const handleChangeSubcription = async (ctx) => {
    const active_plan = plan;
    const active_quantity = users;
    let update_quantity;
    console.log(value);
    if (value === "MONTHLY") {
      update_quantity = inputValue;
    }
    if (value === "YEARLY") {
      update_quantity = input;
    }
    const update_plan = value.toLowerCase();
    const dataApprove = {
      active_plan,
      active_quantity,
      update_quantity: Number(update_quantity) ?? active_quantity,
      update_plan,
    };
    if (ctx) {
      const res = await paymentService.upgradeSubscription(dataApprove);
      if (res.isError) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setChange(false);
        setCancelApprove(true);
      }
    }
  };
  // if user is upgrading subcription details then this helps in doing
  const freeUserSubcription = async (ctx) => {
    const active_plan = plan;
    const active_quantity = users;
    let update_quantity = inputValue;
    const update_plan = value.toLowerCase();

    const dataApprove = {
      active_plan,
      active_quantity,
      update_quantity: Number(update_quantity) ?? active_quantity,
      update_plan,
    };
    if (ctx) {
      const res = await paymentService.upgradeSubscription(dataApprove);
      if (res.isError) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setFreeChange(false);
        setCancelApprove(true);
      }
    }
  };
  const handleFalse = () => {
    setOpen(false);
    setCancel(false);
  };
  const handleUpgradation = () => {
    setChange(false);
    setCancelApprove(false);
  };

  const freeUserUpgradation = () => {
    setFreeChange(false);
    setCancelApprove(false);
  };
  //set values accordingly load form of monthly and yearly
  const handleChangebtn = (e) => {
    setVal(e.target.value);
    if (e.target.value === "MONTHLY") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //// this useEffect checks whether session is having user data if it does not have just clears the data and take user to login page
  useEffect(() => {
    const users = localStorage.getItem("user");
    if (!users) {
      // window.location.reload();
      navigate("/", { replace: true });
    }
    getAdminDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //it sets values of overallsubscription data
  const getAdminDetails = async () => {
    const res: any = await settingsService.paymentDetailAdmin();
    if (res.isError) {
      toast.error(res.message);
    }
    setDate(res?.userData?.current_period_end);
    setPlan(res?.userData?.subscription_plan_type);
    console.log(plan);
    setVal(res?.userData?.subscription_plan_type);
    setUsers(res?.userData?.quantity);
    setCancel(res?.userData?.cancel_at_period_end);
    if (
      res?.userData?.subscription_plan_type &&
      res.userData.subscription_plan_type.toUpperCase() === "MONTHLY"
    ) {
      setInputValue(res.userData.quantity);
      setIsOpen(false);
    } else if (
      res?.userData?.subscription_plan_type &&
      res.userData.subscription_plan_type.toUpperCase() === "YEARLY"
    ) {
      setInput(res.userData.quantity);
      setIsOpen(true);
    } else {
      setFreeOpen(true);
      setIsLoadingAdmin(false);
    }
  };

  //if someone buyies the subscription from inside it navigates user to payment gateway.
  const onSubmit = async (data: IPaymentProps) => {
    debugger;
    console.log("hellop");
    const auth_token = JSON.parse(localStorage.getItem("user"))?.auth_token 
    const useddr = {
      type: data.plan,
      users: data.plan === "monthly" ? inputVal : input,
    };
    // console.log(useddr)
    const { url } = await paymentService.initiatePayment(auth_token, {
      'type': data.plan,
      'users': data.plan === 'monthly' ? inputVal : input
    });
    if (url) {
      setCheckoutURI(url);
      window.location.replace(url);
      navigate(url, {replace: true});
    }
  };

  // yupResolver helps in validation
  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: defaultValuesUser,
  });

  const { handleSubmit, setValue, watch } = methods;
  return (
    <>
      <Stack>{freeOpen ? <></> : <Title id="plan">Plan</Title>}</Stack>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {freeOpen ? (
          <></>
        ) : (
          <Title sx={{ marginTop: "1rem" }}>Active Plan</Title>
        )}
        <SectionContainer>
          <Spacer>
            {freeOpen ? (
              <></>
            ) : (
              <Typography variant="h5">
                Plan Type : {plan?.toString()?.toUpperCase()}{" "}
              </Typography>
            )}
            {freeOpen ? (
              <></>
            ) : (
              <Typography variant="h5">Active Users : {users}</Typography>
            )}
            {freeOpen ? (
              <></>
            ) : cancel ? (
              <Typography variant="h4">
                Your membership will be cancelled at the end of your current
                billing period : {date}{" "}
              </Typography>
            ) : (
              <Typography variant="h5">Next Billing Date : {date}</Typography>
            )}

            {freeOpen ? (
              <Typography variant="h4">
                Select Plan 60 days money back guarantee, If not happy (ask{" "}
                {"-->"} full refund, no catches)
              </Typography>
            ) : null}
            {freeOpen ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SectionContainer title="Monthly">
                        <Spacer>
                          <Grid
                            container
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <SectionContainer
                              title="$20 per user per month"
                              subtitle="(fixed price) "
                            >
                              <Spacer>
                                <Typography
                                  color="success.main"
                                  fontWeight={800}
                                  sx={{
                                    position: "relative",
                                    top: "-3rem",
                                    left: "24rem",
                                  }}
                                >
                                  Active
                                </Typography>
                                <Typography color="darkorange" fontWeight={800}>
                                  Number of users : {inputVal}
                                </Typography>
                                <form onSubmit={handleAddUser}>
                                  <Stack direction="row" spacing={4}>
                                    <TextField
                                      value={inputVal}
                                      sx={{
                                        width: "15rem",
                                      }}
                                      inputProps={{
                                        type: "number",
                                        min: 2,
                                        name: "userCount", // add name attribute to input field
                                      }}
                                      onChange={handleInputFree}
                                    />
                                  </Stack>
                                </form>
                                <Typography color="darkorange" fontWeight={800}>
                                  Cost : ${inputVal * 20}
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
                                        backgroundColor: "#4caf50",
                                        marginLeft: "4rem",
                                        top: "-1rem",
                                      }}
                                      startIcon={<IconChecked />}
                                    >
                                      Selected
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        setValue("plan", "monthly")
                                      }
                                      sx={{
                                        width: buttonWidth,
                                        marginLeft: "4rem",
                                        top: "-1rem",
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
                          <Grid
                            container
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <SectionContainer
                              title="$20 per user per month "
                              subtitle="(2 months free) "
                            >
                              <Spacer>
                                <Typography
                                  color="success.main"
                                  fontWeight={800}
                                  sx={{
                                    position: "relative",
                                    top: "-3rem",
                                    left: "24rem",
                                  }}
                                >
                                  Active
                                </Typography>
                                {/* <Typography color="darkorange" fontWeight={800}>
                          Current number : {totalUsers}
                        </Typography> */}
                                <Typography color="darkorange" fontWeight={800}>
                                  Number of users : {input}
                                </Typography>
                                <form onSubmit={handleAddUser}>
                                  <Stack direction="row" spacing={4}>
                                    <TextField
                                      value={input}
                                      sx={{
                                        width: "15rem",
                                      }}
                                      inputProps={{
                                        type: "number",
                                        min: 2,
                                        name: "userCount", // add name attribute to input field
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
                                        backgroundColor: "#4caf50",
                                        marginLeft: "4rem",
                                        top: "-1rem",
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
                                        marginLeft: "4rem",
                                        top: "-1rem",
                                        // backgroundColor: 'transparent',
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
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "10rem",
                      }}
                    >
                      <Spacer></Spacer>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      {!!watch("plan") ? (
                        <Button
                          variant="contained"
                          fullWidth
                          size="medium"
                          type="submit"
                        >
                          Proceed with payment
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          size="medium"
                          disabled
                        >
                          {" "}
                          Proceed with payment{" "}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : null}
            {freeOpen ? (
              <></>
            ) : cancel ? (
              <Button
                type="submit"
                variant="contained"
                onClick={handleRestart}
                color="success"
                sx={{ width: "11rem" }}
              >
                Restart Membership
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleCancel}
                  color="error"
                  sx={{ width: "11rem" }}
                >
                  Cancel Subscription
                </Button>

                <Button
                  variant="contained"
                  onClick={() => setShow(true)}
                  sx={{ width: "9rem" }}
                >
                  Change Plan
                </Button>
              </>
            )}
          </Spacer>
        </SectionContainer>
      </Grid>
      <Stack>
        {freeOpen ? (
          <></>
        ) : Show && !cancel ? (
          <RadioGroup onChange={handleChangebtn}>
            <FormControlLabel
              value="MONTHLY"
              control={<Radio />}
              label="Monthly"
            />
            <FormControlLabel
              value="YEARLY"
              control={<Radio />}
              label="Yearly"
            />
          </RadioGroup>
        ) : (
          <></>
        )}
      </Stack>
      {!freeOpen && !cancel && Show && isopen && value === "YEARLY" ? (
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <SectionContainer title="Yearly">
            <Spacer>
              <Grid container spacing={2}>
                <Spacer>
                  <Typography color="darkorange" fontWeight={800}>
                    {users > input
                      ? `Reduced Users : ${Math.abs(input - users)}`
                      : users < input
                      ? `New Number Of User : ${Math.abs(input - users)}`
                      : ""}
                  </Typography>
                  <form onSubmit={handleAddUser}>
                    <Stack direction="row" spacing={4}>
                      <TextField
                        name="yearly"
                        value={input}
                        sx={{
                          width: "15rem",
                        }}
                        inputProps={{
                          type: "number",
                          min: 2,
                        }}
                        onChange={handleInputChange}
                      />
                    </Stack>
                  </form>
                  <Typography color="darkorange" fontWeight={800}>
                    Cost of yearly : ${input * 200}
                  </Typography>
                  <Typography fontWeight={800}>
                    {users > input
                      ? "The subscription cost will be reduced on next billing cycle"
                      : users < input
                      ? "The subscription cost will be added on next billing cycle."
                      : ""}
                  </Typography>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Stack spacing={2} direction="row">
                      {users === input &&
                      value === "YEARLY" &&
                      plan === "yearly" ? (
                        <Button
                          variant="contained"
                          type="submit"
                          disabled
                          onClick={() => setChange(true)}
                          sx={{ width: "28rem" }}
                        >
                          {" "}
                          Approve Changes{" "}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={() => setChange(true)}
                          sx={{ width: "28rem", color: "white" }}
                        >
                          Approve changes
                        </Button>
                      )}

                      <Button color="error">Cancel</Button>
                    </Stack>
                  </Grid>
                </Spacer>
              </Grid>
            </Spacer>
          </SectionContainer>
        </Grid>
      ) : null}
      {!freeOpen && !cancel && value === "MONTHLY" ? (
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <SectionContainer title="Monthly">
            <Spacer>
              <Grid container spacing={2}>
                <Spacer>
                  <Typography color="darkorange" fontWeight={800}>
                    {users > inputValue
                      ? `Reduced Users : ${Math.abs(inputValue - users)}`
                      : users < inputValue
                      ? `New Number Of User : ${Math.abs(inputValue - users)}`
                      : ""}
                  </Typography>
                  <form onSubmit={handleAddUser}>
                    <Stack direction="row" spacing={4}>
                      <TextField
                        name="monthly"
                        value={inputValue}
                        sx={{
                          width: "15rem",
                        }}
                        inputProps={{
                          type: "number",
                          min: 0,
                        }}
                        onChange={handleInputChange}
                      />
                    </Stack>
                  </form>
                  <Typography color="darkorange" fontWeight={800}>
                    Cost of monthly : ${inputValue * 20}
                  </Typography>
                  <Typography fontWeight={800}>
                    {users > inputValue
                      ? "The subscription cost will be reduced on next billing cycle"
                      : users < inputValue
                      ? "The subscription cost will be added on next billing cycle."
                      : ""}
                  </Typography>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Stack spacing={2} direction="row">
                      {users == inputValue &&
                      value === "MONTHLY" &&
                      plan === "monthly" ? (
                        <Button
                          variant="contained"
                          disabled
                          type="submit"
                          sx={{ width: "28rem" }}
                          onClick={() => setChange(true)}
                        >
                          Approve changes
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={() => setChange(true)}
                          sx={{
                            width: "28rem",
                            color: "white",
                          }}
                        >
                          Approve changes
                        </Button>
                      )}
                      <Button color="error">Cancel</Button>
                    </Stack>
                  </Grid>
                </Spacer>
              </Grid>
            </Spacer>
          </SectionContainer>
        </Grid>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="add-user-modal"
      >
        <CancelSubscription
          onSuccess={success}
          onSuccessClose={handleClose}
          onFailure={handleFalse}
        />
      </Modal>
      <Modal
        open={change}
        onClose={handleChangeSubcription}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="add-user-modal"
      >
        <ApproveSubscription
          onSuccess={succ}
          onSuccessClose={handleChangeSubcription}
          onFailure={handleUpgradation}
        />
      </Modal>

      <Modal
        open={freeChange}
        onClose={freeUserSubcription}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="add-user-modal"
      >
        <FreeUser
          onSuccess={OnSuccess}
          onSuccessClose={freeUserSubcription}
          onFailure={freeUserUpgradation}
        />
      </Modal>
    </>
  );
}
