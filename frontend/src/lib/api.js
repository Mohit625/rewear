import API from "@/api/axios";

// Auth
export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);

// Items
export const getItems = () => API.get('/items');
export const getItemById = (id) => API.get(`/items/${id}`);
export const uploadItem = (data) => API.post('/items', data);

// Notifications
export const getNotifications = () => API.get('/user/notifications');
export const markNotificationsRead = () => API.patch('/user/notifications/read');

// Admin
export const getAllUsers = () => API.get('/admin/users');
export const getPendingItems = () => API.get('/admin/pending');
export const approveItem = (id) => API.patch(`/admin/approve/${id}`);
export const deleteItem = (id) => API.delete(`/admin/items/${id}`);

// Swaps
export const createSwap = (data) => API.post('/swaps', data);
export const acceptSwap = (id) => API.put(`/swaps/${id}/accept`);

export default API;
