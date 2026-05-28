import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;


// =========================
// GET PROFILE
// =========================

export const getProfile =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(

        `${API}/api/users/profile`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };


// =========================
// UPDATE PROFILE
// =========================

export const updateProfile =
  async (formData) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(

        `${API}/api/users/profile`,

        formData,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };