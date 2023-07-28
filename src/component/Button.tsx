import MuiButton, { ButtonProps } from "@mui/material/Button";

//The component takes in props of type "ButtonProps", which are the props that the MUI Button component accepts
const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <MuiButton {...rest} size="large">
      {children}
    </MuiButton>
  );
};

export default Button;
