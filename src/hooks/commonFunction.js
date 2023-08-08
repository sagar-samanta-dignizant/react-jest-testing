//These are two functions that retrieve information from the localStorage of the browser. The getAuthToken function returns the authentication token of the currently logged in user, while the getRole function returns the role of the user
export const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.auth_token;
};
export const getRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role;
};
