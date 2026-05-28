import API from "./api";

export const getProducts = async () => {

  const res = await API.get(
    "/products"
  );

  return res.data;
};


export const createProduct = async (data) => {

  const res = await API.post(
    "/products",
    data
  );

  return res.data;
};


export const updateProduct = async (id,data) => {

  const res = await API.put(

    `/products/${id}`,

    data

  );

  return res.data;
};


// UPDATE CAMPAIGN

export const updateCampaign = async (
  id,
  aiCampaign
) => {

  const res = await API.put(

    `/products/campaign/${id}`,

    {
      aiCampaign
    }

  );

  return res.data;
};


// DELETE PRODUCT

export const deleteProduct = async (id) => {

  const res = await API.delete(

    `/products/${id}`

  );

  return res.data;
};