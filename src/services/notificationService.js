import API from "./api";


// GET NOTIFICATIONS

export const getNotifications = async () => {

  const response = await API.get(
    "/notifications"
  );

  return response.data;
};


// MARK AS READ

export const markAsRead = async (id) => {

  const response = await API.put(

    `/notifications/${id}/read`
  );

  return response.data;
};


// DELETE NOTIFICATION

export const deleteNotification = async (id) => {

  const response = await API.delete(

    `/notifications/${id}`
  );

  return response.data;
};

// count 
export const getUnreadCount = async () => {

  const response = await API.get(
    "/notifications"
  );

  return response.data.filter(

    (item) => !item.read

  ).length;
};

