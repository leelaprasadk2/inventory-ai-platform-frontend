import axios from "axios";

const API =
  "http://localhost:5000/api/admin";

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

        `${API}/users`,

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

        `${API}/users/${id}`,

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

        `${API}/users/${userId}/products`,

        {

          headers: {

            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };