import { useState } from 'react'
import { Button, Title } from '../../../component'
import { Box, Divider, TextField } from '@mui/material'
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

export default function AddPassword(props) {
  const { onAddPassword, selectedUser } = props
  const [password, setPasswordValue] = useState([])
  
  const onInputChange = (e) => {
    const currentPassword = e.target.value
    setPasswordValue(currentPassword)
  }

  // this page sets value of headset key accourdingly with the help of password
  return (
    <>
      <Box title="Password" sx={style}>
        <Spacer>
          <Title id="verify-password">Verify Password</Title>
          <Divider />
          <Spacer>
            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              onChange={onInputChange}
              required
            />
            <Button variant="contained" onClick={() => onAddPassword({ password, customer_id: selectedUser._id })}>
              Create Headset Key
            </Button>
          </Spacer>
        </Spacer>
      </Box>
    </>
  )
}
