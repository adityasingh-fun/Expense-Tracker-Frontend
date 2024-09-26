import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { base_url } from "../../utils/url";
import axios from "axios";

const token = getUserFromStorage();

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${base_url}/users/login`, {
    email,
    password,
  });
  //! Return the promise
  return response.data;
};

//! register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${base_url}/users/register`, {
    email,
    password,
    username,
  });
  return response.data;
};

//! profile
export const profileAPI = async () => {
  const response = await axios.get(`${base_url}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//! update
export const updateProfileAPI = async ({ email, username }) => {
  const response = await axios.put(
    `${base_url}/users/update-profile`,
    {
      username,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! change password
export const changePasswordAPI = async ({ newPassword }) => {
  const response = await axios.put(
    `${base_url}/users/change-password`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
