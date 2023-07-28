import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material'

//The Dialog component is used from the Material-UI library and includes the DialogTitle and DialogActions components for styling and functionality.
export default function DeleteConfirmPopUp(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography color={'black'} variant="h1">
            Are you sure?
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={props.handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
