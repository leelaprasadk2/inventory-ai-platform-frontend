import axios from "axios";

const API =
  "http://localhost:5000/api/users";

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

        `${API}/profile`,

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

        `${API}/profile`,

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