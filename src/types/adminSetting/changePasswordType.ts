// defines the shape of an object representing the data needed to change a user's password.
export type TChangePassword = {
  new_password: string | null;
  confirm_password: string | null;
  add: ({}) => void;
};
