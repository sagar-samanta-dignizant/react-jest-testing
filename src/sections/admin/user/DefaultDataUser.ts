import { TUserFormData } from '../../../types/userTypes'

// this is data which is defined of user
export const defaultValuesUser: TUserFormData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    displayName: '',
    confirmPassword: '',
    profileImage: '',
    phoneNo: '',
    role: '',
    add: function ({ }: {}): void {
      throw new Error('Function not implemented.')
    },
  }