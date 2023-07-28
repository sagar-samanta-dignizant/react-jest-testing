import { TUserProfileFormData } from '../../types/userProfile'

export const defaultValues: TUserProfileFormData = {
    full_name: '',
    email: '',

    add: function ({ }: {}): void {
      throw new Error('Function not implemented.')
    },
  }