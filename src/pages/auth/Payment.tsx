import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Page, Title } from '../../component'
import {
  PaymentFailed,
  PaymentSection,
  PaymentSuccess,
  PaymentSuccessFree
} from '../../sections/auth'
import { Typography } from '@mui/material'

//The getPaymentUI function is used to determine which payment UI to render based on the payment status. It uses a switch statement to return the appropriate UI based on the payment status.
function getPaymentUI(payment_status) {
  debugger
  switch (payment_status) {
    case 'SUCCESS':
      return <PaymentSuccess />
      
      case 'FAILED':
        return <PaymentFailed />
        
        case 'CANCELLED':
          return <h1>Payment cancelled</h1>
          
          case 'SUCCESSFREE':
            return <PaymentSuccessFree/>
            
            default:
              return (
                <>
          <Typography variant='h2'>Select Plan 60 days money back guarantee</Typography>
          <Typography variant='h4'>If not happy (ask {'-->'} full refund, no catches)</Typography>
          <PaymentSection />
        </>
      )
    }
  }
  //The Payment component renders the Page component with the title "Payments" and the UI returned by the getPaymentUI function based on the payment status.
  function Payment() {
    debugger
    const [searchParams] = useSearchParams()
    const paymentStatus = useMemo(() => {
      if (searchParams.get('success') === 'true') {
        return 'SUCCESS'
      }
      if (searchParams.get('success') === 'false') {
        return 'FAILED'
      }
      if (searchParams.get('canceled') === 'true') {
        return 'CANCELLED'
      }
      if (searchParams.get('successfree') === 'true') {
        return 'SUCCESSFREE'
      }
    }, [searchParams])

    return <Page title="Payments">{getPaymentUI(paymentStatus)}</Page>
  }
  
export default Payment
