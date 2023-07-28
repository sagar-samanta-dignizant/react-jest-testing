
import { Box, Divider, Grid } from '@mui/material'
import Spacer from '../../component/Spacer';

import { Button, Title } from '../../component';


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
  // this function helps to update subscription updating on behalf of yes or no page.
export default function VerifyDelete(props) {
    const { onSuccessClose } = props;

    const onAddUser = async (data) => {
      if (data) {
        onSuccessClose(data)
      } else {
        onSuccessClose(data)
      }
  
    };
    
  return (
    <>
      <Box title="Users" sx={style}>
        <Spacer>
          <Title id="add-user" sx={{color:"darkorange"}}>Are you sure you want to delete user ?</Title>
          <Divider />
          <Spacer>
            <Grid>
            <Button variant="contained" sx={{width: '7rem', left:'15%'}} onClick={() => onAddUser(true)}>
             Yes
            </Button>
            <Button variant="contained" sx={{width: '7rem', left:'35%'}} onClick={() => onAddUser(false)}>
             No
            </Button>
            </Grid>
          </Spacer>
        </Spacer>
      </Box>
    </>
  )
}
