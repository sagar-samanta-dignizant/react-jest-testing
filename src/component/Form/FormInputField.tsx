import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

function FormInputField(props) {
  const { control } = useFormContext()
  const { name, ...rest } = props

  //The "Controller" component from React Hook Form is used to connect the input field to the form's state
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...rest}
          id={name}
        />
      )}
    />
  )
}

export default FormInputField
