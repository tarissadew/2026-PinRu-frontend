import axios from 'axios';

const API_BASE_URL = 'http://localhost:5082/api';

export const getRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/Room`); // Pastikan kamu punya RoomController
  return response.data;
};

export const getBookings = async (status?: string) => {
  const url = status ? `${API_BASE_URL}/Booking?status=${status}` : `${API_BASE_URL}/Booking`;
  const response = await axios.get(url);
  return response.data;
};

export const updateBookingStatus = async (id: number, status: string) => {
  const response = await axios.patch(`${API_BASE_URL}/Booking/${id}/status`, { status });
  return response.data;
};

export const createRoom = async (roomData: { name: string; capacity: number; location: string }) => {
    const response = await axios.post(`${API_BASE_URL}/Room`, roomData);
    return response.data;
};