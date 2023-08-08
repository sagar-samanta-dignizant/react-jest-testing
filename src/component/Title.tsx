import { Typography, TypographyProps } from "@mui/material";
import { Stack } from "@mui/system";

//This is a functional component called Title. It takes in props of type TypographyProps. Within the component, it renders a Stack component from the MUI library and a Typography component with a variant of "h3"
function Title(props) {
  return (
    <Stack>
      <Typography variant="h3" {...props}></Typography>
    </Stack>
  );
}

export default Title;
