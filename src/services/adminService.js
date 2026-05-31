import axios from "axios";

const API =
import.meta.env.VITE_API_URL;
// =========================
// GET TOKEN
// =========================

const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

// =========================
// GET USERS
// =========================

export const getUsers =
  async () => {

    const response =
      await axios.get(

        `${API}/admin/users`,

        {

          headers: {

            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

// =========================
// DELETE USER
// =========================

export const removeUser =
  async (
    id,
    adminPassword
  ) => {

    const response =
      await axios.delete(

        `${API}/admin/users/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${getToken()}`,
          },

          data: {

            adminPassword,
          },
        }
      );

    return response.data;
  };

// =========================
// DOWNLOAD PRODUCTS
// =========================

export const downloadProducts =
  async (userId) => {

    const response =
      await axios.get(

        `${API}/admin/users/${userId}/products`,

        {

          headers: {

            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };