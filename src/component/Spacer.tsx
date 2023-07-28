import { Stack } from '@mui/material'

//The Spacer component is a simple MUI Stack wrapper that adds a default spacing of 3 between its children elements. It receives props as an argument, and uses object destructuring to pass them down to the Stack component
const Spacer = (props) => {
  return (
    <Stack spacing={3} {...props}>
      {props.children}
    </Stack>
  )
}

export default Spacer
