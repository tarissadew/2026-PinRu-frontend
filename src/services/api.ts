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

export default api;