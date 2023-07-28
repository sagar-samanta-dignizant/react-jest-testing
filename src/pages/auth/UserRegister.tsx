import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { Page, Title } from '../../component'
import { FormProvider } from '../../component/Form'
import userloginSchema from '../../schema/user.register.schema'
import { UserDetailsStepForm } from '../../sections/auth'
import authService from '../../services/auth.service'
import { IRegisterUserFormData } from '../../types'
import {defaultValues} from '../auth/userRegisterData'
import { encrypt, getKey, singleHash } from '../../sections/auth/register_company/Encrypt&Decrypt'

export default function UserRegister() {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [companyId, setCompanyId] = useState('')
  const [adminId, setAdminId] = useState('')

  //The component defines a defaultValues object containing the initial state of the registration form, and sets up a useForm hook with yupResolver as the resolver.
  const methods = useForm({
    resolver: yupResolver(userloginSchema),
    defaultValues:defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = methods

  //The component also uses the useEffect hook to parse query parameters from the URL, and sets the form fields with the corresponding values. It also sets the companyId and adminId state variables based on the query parameters.
  useEffect(() => {
    const data = location.search.split('&')

    data.map((obj) => {
      if (obj.startsWith('?')) {
        const a = obj.replace('?', '')
        const objData = a.split('=')
        setValue('user_email', objData[1])
      }

      if (obj.includes('companyId')) {
        const objData = obj.split('=')
        setCompanyId(objData[1])
      }

      if (obj.includes('adminId')) {
        const objData = obj.split('=')
        setAdminId(objData[1])
      }
    })
  }, [])

  const isError = (fieldname: string) =>
    errors[fieldname] ? theme.palette.error.light : theme.palette.primary.main
  const [imageLocal, setImageLocal] = useState('')

  const onSubmit = async (data: IRegisterUserFormData) => {
    const firstFiveLettersOfPassword = data.password.slice(0, 5);
    const hashedWithFirstFiveLetters = data.password + firstFiveLettersOfPassword;
  
    const model_password = singleHash(hashedWithFirstFiveLetters);
    const hashedPassword = singleHash(data.password);
    console.log(hashedPassword)
    console.log(model_password)
    let master_key = getKey();
    let encrptFullName = encrypt(master_key, data.full_name).encrypted
    let encrptDisplayName = encrypt(master_key, data.display_name).encrypted
    //   const hashedConfirmPassword = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(data.confirm_password)).toString(CryptoJS.enc.Hex); 
    const formData = new FormData()
    formData.append('full_name', data.full_name)
    formData.append('email', data.user_email)
    formData.append('password', hashedPassword)
    formData.append('model_password', model_password)
    formData.append('userFile', data.avatar)
    formData.append('display_name', data.display_name)
    formData.append('companyId', companyId)
    formData.append('adminId', adminId)
    formData.append('phone_no', data.phone_no)
    const { isError, message } = await authService.registerUSER(formData)
    if (!isError) {
      toast.success(message)
      navigate('/login')
    } else {
      toast.error(message)
    }
  }
  const setImage = (data) => {
    setValue('avatar', data[0])
    setImageLocal(data)
  }

  //The component includes an onSubmit function that constructs a FormData object from the form data, and appends it with additional data such as companyId and adminId. The setImage function is used to update the avatar image
  return (
    <Page title="Register User">
      <Title>Register User</Title>
      <Box sx={{ width: '620px' }}>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <UserDetailsStepForm
            id="users"
            isError={isError}
            setImage={setImage}
            imageLocal={imageLocal}
            isMailDisabled={true}
            watch={watch}
            setValue={setValue}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{ marginTop: '15px' }}
          >
            Register User
          </Button>

        </FormProvider>
      </Box >
    </Page>
  )
}
