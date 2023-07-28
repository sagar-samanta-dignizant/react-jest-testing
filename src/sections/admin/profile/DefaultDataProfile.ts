import { TAdminDetailsFormData, TUserDetailsFormData } from "../../../types/adminSetting/adminDetailsType";
import { TChangePassword } from '../../../types/adminSetting/changePasswordType'
import { TCompanyDetailsFormData } from "../../../types/adminSetting/companyDetailsType";

//data defined of the user fields
export const defaultValuesAdmin: TAdminDetailsFormData = {
    full_name: "",
    email: "",
    mobile_no: "",
    add: function ({ }: {}): void {
      throw new Error("Function not implemented.");
    },
  };
  export const defaultValuesUsers: TUserDetailsFormData = {
    firstName: "",
    email: "",
    phoneNo: "",
    add: function ({ }: {}): void {
      throw new Error("Function not implemented.");
    },
  };
export const defaultValuesPassword: TChangePassword = {
    new_password: '',
    confirm_password: '',
    add: function ({ }: {}): void {
      throw new Error('Function not implemented.')
    },
  }

export const defaultValuesFormData: TCompanyDetailsFormData = {
    companyname: '',
    company_address_1: '',
    company_address_2: '',
    company_state: '',
    company_city: '',
    company_country: '',
    company_postal_code: '',
    add: function ({ }: {}): void {
      throw new Error('Function not implemented.')
    },
  }

  export const defaultValuesUser: any = {
    plan: "",
    userCount: "",
  };

  