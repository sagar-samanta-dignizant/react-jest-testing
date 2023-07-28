import  { useEffect, useState } from 'react'
import { Title } from '../../../component'
import Spacer from '../../../component/Spacer'
import Switch from '@mui/material/Switch'
import settingsService from '../../../services/settings.service'
import toast from 'react-hot-toast/headless'
import { useAuth } from '../../../hooks/useAuth'

// It imports several components and modules such as useEffect, useState, Title, Spacer, Switch, settingsService, toast, and useAuth.
function FactorAuthentication() {
  //The component also has a state variable called data initialized to null using the useState hook. This variable is later updated using the setData function.
  const [data, setData] = useState(null)
  const { user } = useAuth()

  // there are two functions named twoFactorAdmin and twoFactorUser. These functions are responsible for making API calls to toggle the two-factor authentication settings for admin and user respectively.
  const twoFactorAdmin = async (e: any) => {
    debugger
    const {
      isError,
      companyData,
      message,
    } = await settingsService.editTwoFactorAdmin(
      { [e.target.name]: e.target.checked }
    )
    if (!isError) {
      toast.success(message)
      setData(companyData)
    } else {
      toast.error(message)
    }
  }

  const twoFactorUser = async (e: any) => {
    const {
      isError,
      companyData,
      message,
    } = await settingsService.editTwoFactorUser(
      { [e.target.name]: e.target.checked }
    )
    if (!isError) {
      toast.success(message)
      setData(companyData)
    } else {
      toast.error(message)
    }
  }

  //The useEffect hook is called to fetch the current two-factor authentication settings using the getToggleData function.
  useEffect(() => {
    debugger
    getToggleData()
  }, [])

  const getToggleData = async () => {
    debugger
    const { isError, companyData, message } = await settingsService.getCompany()
    if (!isError) {
      setData(companyData)
    } else {
      toast.error(message)
    }
  }

  return (
    <Spacer>
      <Spacer direction="row" alignItems="center">
        <Title>Admin</Title>
        <Switch
          name="is_admin_otp_enable"
          checked={data?.is_admin_otp_enable}
          onClick={twoFactorAdmin}
        />
      </Spacer>
      <Spacer direction="row" alignItems="center" spacing={5}>
        <Title>User</Title>
        <Switch
          name="is_user_otp_enable"
          checked={data?.is_user_otp_enable}
          onClick={twoFactorUser}
        />
      </Spacer>
    </Spacer>
  )
}

export default FactorAuthentication
