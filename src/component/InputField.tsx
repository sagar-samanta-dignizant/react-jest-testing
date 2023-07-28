import { TextField, TextFieldProps } from "@mui/material";

//This is a simple React component that wraps the TextField component from Material-UI and adds the variant="outlined" and fullWidth props to it.
const InputField = (props: TextFieldProps) => {
  return <TextField variant="outlined" {...props} fullWidth />;
};

export default InputField;
