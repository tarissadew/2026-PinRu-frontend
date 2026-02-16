import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5082/api', 
});

export const getRooms = async () => {
  const response = await api.get('/Room'); 
  return response.data;
};

export const createRoom = async (roomData: { name: string; capacity: number; location: string }) => {
  const response = await api.post('/Room', roomData);
  return response.data;
};

export const deleteRoom = async (id: number) => {
    const response = await api.delete(`/Room/${id}`); 
    return response.data;
};

export const updateRoom = async (id: number, roomData: any) => {
    const response = await api.put(`/Room/${id}`, roomData);
    return response.data;
};

export const getBookings = async (status?: string) => {
  const url = status ? `/Booking?status=${status}` : '/Booking';
  const response = await api.get(url);
  return response.data;
};

export const updateBookingStatus = async (id: number, status: string) => {
  const response = await api.patch(`/Booking/${id}/status`, { status }); 
  return response.data;
};

export const deleteBooking = async (id: number) => {
  const response = await api.delete(`/Booking/${id}`);
  return response.data;
};

export const updateBooking = async (id: number, data: any) => {
  const response = await api.patch(`/Booking/${id}`, data);
  return response.data;
};

export const getMyBookings = async (customerName: string) => {
    const response = await api.get(`/Booking?customerName=${customerName}`);
    return response.data;
};

export const login = async (credentials: any) => {
    const response = await api.post('/Auth/login', credentials);
    return response.data;
};

export const getAllCustomers = async () => {
    const response = await api.get('/Auth/users?role=Mahasiswa'); 
    return response.data;
};

export const getAllUsers = async (role: string) => {
    const response = await api.get(`/Auth/users?role=${role}`);
    return response.data;
};

export const deleteUser = async (id: number) => {
    return await api.delete(`/Auth/users/${id}`);
};

export const createBooking = async (bookingData: any) => {
    const response = await api.post('/Booking', bookingData);
    return response.data;
};

export default api;