export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  return token?.token;
};
