import { create } from "zustand";
import { ticketApi } from "../services/ticketApi";

export const useTicketStore = create((set, get) => ({
  tickets: [],
  loading: false,
  error: null,
  selectedTicket: null,
  searchTerm: "",
  statusFilter: "All",
  priorityFilter: "All",

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const tickets = await ticketApi.getTickets();
      set({ tickets, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Unable to load tickets. Please try again.",
      });
    }
  },

  createTicket: async (ticketData) => {
    set({ error: null });
    try {
      const createdTicket = await ticketApi.createTicket(ticketData);
      set((state) => ({
        tickets: [createdTicket, ...state.tickets],
      }));
      return { success: true, ticket: createdTicket };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Could not create the ticket. Please check the API and try again.";
      set({ error: message });
      return { success: false, message };
    }
  },

  updateTicketStatus: async (id, status) => {
    const previousTickets = get().tickets;
    const previousSelected = get().selectedTicket;
    const currentTicket = previousTickets.find((ticket) => ticket.id === id);
    if (!currentTicket) return;

    const updatedTicket = { ...currentTicket, status };
    set({
      tickets: previousTickets.map((ticket) =>
        ticket.id === id ? updatedTicket : ticket
      ),
      selectedTicket:
        previousSelected?.id === id ? { ...previousSelected, status } : previousSelected,
      error: null,
    });

    try {
      const savedTicket = await ticketApi.updateTicket(id, { status });
      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === id ? savedTicket : ticket
        ),
        selectedTicket:
          state.selectedTicket?.id === id ? savedTicket : state.selectedTicket,
      }));
    } catch (error) {
      set({
        tickets: previousTickets,
        selectedTicket: previousSelected,
        error: "Could not update the ticket status. The change was reverted.",
      });
    }
  },

  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  clearFilters: () =>
    set({ searchTerm: "", statusFilter: "All", priorityFilter: "All" }),
  clearError: () => set({ error: null }),
}));