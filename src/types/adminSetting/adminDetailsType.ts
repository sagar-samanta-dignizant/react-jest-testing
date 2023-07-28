//defines the shape of an object that contains admin details form data.
export type TAdminDetailsFormData = {
  full_name: string | null;
  email: string | null;
  mobile_no: string | null;
  add: ({}) => void;
};

export type TUserDetailsFormData = {
  firstName: string | null;
  email: string | null;
  phoneNo: string | null;
  add: ({}) => void;
};
