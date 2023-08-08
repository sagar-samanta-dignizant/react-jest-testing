import * as React from 'react'
import { Button, Title } from '../../../component'
import { Box, Divider, TextField, Grid, Chip } from '@mui/material'
import Spacer from '../../../component/Spacer'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
// this function helps to add user to admin page sets value & send that value through props
export default function AddUser(props) {
  const { onAddUser } = props
  const [emailValue, setEmailValue] = React.useState([])

  const onInputChange = (e) => {
    const emailList = e.target.value.split(',');
    setEmailValue(emailList)
  }

  return (
    <>
      <Box title="Users" sx={style}>
        <Spacer>
          <Title id="add-user">Add User</Title>
          <Divider />
          <Spacer>
            <Grid container spacing={2}>
              {emailValue.slice(0, 9).map((obj, index) => (
                <Grid item key={index}>
                  <Chip label={obj} />
                </Grid>
              ))}
              {emailValue.length > 10 && (
                <Grid item>
                  <Chip label={`${emailValue.length - 9} more`} />
                </Grid>
              )}
            </Grid>
            <TextField
              name="email"
              label="Email *"
              type="text"
              placeholder="Email"
              onChange={onInputChange}
              
            />
            <Button variant="contained" onClick={() => onAddUser(emailValue)}>
              Send Link
            </Button>
          </Spacer>
        </Spacer>
      </Box>
    </>
  )
}
