import { Grid, InputAdornment, Stack, useTheme } from '@mui/material'
import  { useState } from 'react'
import { Button, InputField } from '../../../component'
import {
  IconName,
  IconCalender,
  IconNumber,
} from '../../../config/icons.config'
import Spacer from '../../../component/Spacer'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

// It imports several MUI components such as Box, Grid, InputAdornment, and Stack, as well as custom components such as Button, InputField, Spacer, and Cards. It also imports several icon components.
export default function PaymentDetailsForm() {
//The component uses useState hooks to maintain the state of the form fields: cvc, expiry, focus, name, and number
  const theme = useTheme()
  const isError = (fieldname: string) => theme.palette.primary.main
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [focus, setFocus] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }
  return (
    <Grid container spacing={2}>
      <Spacer direction="row">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <InputField
              type="tel"
              name="number"
              placeholder="Card Number"
              label="Card Number"
              onChange={(e) => {
                setNumber(e.target.value)
              }}
              onFocus={handleInputFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconNumber color={isError('user_name')} />
                  </InputAdornment>
                ),
              }}
              id="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <InputField
              type="name"
              name="name"
              placeholder="name"
              label="Name"
              onChange={(e) => {
                setName(e.target.value)
              }}
              onFocus={handleInputFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconName color={isError('user_name')} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <InputField
              type="tel"
              name="expiryDate"
              placeholder="Expiry Date"
              label="Expiry Date"
              onChange={(e) => {
                setExpiry(e.target.value)
              }}
              onFocus={handleInputFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconCalender color={isError('user_name')} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <InputField
              type="tel"
              name="cvc"
              placeholder="CVC Code"
              label="CVC Code"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={handleInputFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconName color={isError('user_name')} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Spacer>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Save Changes</Button>
          <Button color="error">Reset</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
