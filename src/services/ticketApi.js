import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  timeout: 8000,
});

export const ticketApi = {
  getTickets: async () => {
    const response = await api.get("/tickets");
    return response.data;
  },

  createTicket: async (ticket) => {
    const response = await api.post("/tickets", ticket);
    return response.data;
  },

  updateTicket: async (id, changes) => {
    const response = await api.patch(`/tickets/${id}`, changes);
    return response.data;
  },
};