import Button, { ButtonProps } from "@mui/material/Button";


//This code exports a new component named MuiButton which is essentially a customized version of the Button component from the MUI library.
const MuiButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button {...rest} size="small" sx={{ padding: "3px !important" }}>
      {children}
    </Button>
  );
};

export default MuiButton;
