//User form data defined on this file
export type TUserFormData = {
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  phoneNo: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  profileImage: string | null;
  role: string | null;
  add: ({}) => void;
};
