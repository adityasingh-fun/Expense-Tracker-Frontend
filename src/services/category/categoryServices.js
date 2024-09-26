import axios from "axios";
import { base_url } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
const token = getUserFromStorage();

//! Add category
export const addCategoryAPI = async ({ type, name }) => {
  console.log("The token is", token);
  const response = await axios.post(
    `${base_url}/categories/create`,
    {
      type,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //! Return the promise
  return response.data;
};

//! Category List
export const listCategoriesAPI = async () => {
  const response = await axios.get(`${base_url}/categories/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//! Update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${base_url}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Delete category
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${base_url}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
