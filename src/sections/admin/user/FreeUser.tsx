import { Button, Title } from '../../../component'
import { Box, Divider, Grid, Typography } from '@mui/material'
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

export default function FreeUser(props) {
    const { onSuccess, onSuccessClose, onFailure } = props;
    const onAddUser = async (data) => {
      if (data) {
        onSuccessClose(data)
      } else {
        onFailure(data)
      }
    };
  // this function confirms with user do you want to prcoeed with payment yes or no for free user
    return (
      <>
        <Box title="Users" sx={style}>
          <Spacer>
  
            <Typography variant="h2" >
             Payment
            </Typography>
            <Divider />
  
            <Title id="add-user" sx={{ color: "darkorange" }}>
            Do you want to proceed with payment ?
            </Title>
            <Divider />
            <Spacer>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ width: "7rem", left: "15%" }}
                  onClick={() => onAddUser(true)}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "7rem", left: "35%" }}
                  onClick={() => onAddUser(false)}
                >
                  No
                </Button>
              </Grid>
            </Spacer>
          </Spacer>
        </Box>
      </>
    );
  }