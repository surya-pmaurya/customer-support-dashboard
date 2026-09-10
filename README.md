# Customer Support Dashboard

A responsive customer support dashboard built as a frontend technical task. The application allows a support team to view, search, filter, inspect, and update customer support tickets.

## Features

- Dashboard statistics for Total, Open, In Progress, and Resolved tickets
- Ticket search by customer name or subject
- Status and priority filters that can be combined
- Reset filters
- Ticket details side panel with customer information and conversation history
- Ticket status updates with optimistic UI updates
- Create new tickets through a validated modal form
- Zustand state management
- Axios API service layer
- JSON Server local mock REST API
- Loading, API error, retry, empty, and empty-filtered states
- Responsive desktop, tablet, and mobile layout
- Accessible labels and keyboard focus styles
- Add New Tickets with full of details 

## Technologies

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Zustand
- Axios
- JSON Server
- Lucide React

## Installation

```bash
git clone <your-repository-url>
cd customer-support-dashboard
npm install
```

## Run the frontend

```bash
npm run dev
```

Vite will display the local URL in the terminal.

## Run the mock API

Open another terminal in the project folder:

```bash
npm run api
```

The JSON Server API runs at:

```text
http://localhost:3001
```

## Environment variable

Optionally create a `.env` file from `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:3001
```

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/tickets` | Fetch all support tickets |
| POST | `/tickets` | Create a new support ticket |
| PATCH | `/tickets/:id` | Update a ticket, including its status |

## Project structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── StatsCards.jsx
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   ├── TicketList.jsx
│   ├── TicketCard.jsx
│   ├── TicketStatusBadge.jsx
│   ├── PriorityBadge.jsx
│   ├── TicketDetails.jsx
|   |--- NewTicketModel.jsz
│   ├── Loading.jsx
│   ├── ErrorState.jsx
│   └── EmptyState.jsx
├── services/
│   └── ticketApi.js
├── store/
│   └── ticketStore.js
├── utils/
│   └── helpers.js
├── App.jsx
├── index.css
└── main.jsx

db.json
```

## Architecture

UI components are intentionally kept focused on presentation and user interaction. Zustand contains the shared application state and async actions. API calls are isolated in `src/services/ticketApi.js`, keeping HTTP logic out of UI components.

The store manages tickets, loading and error states, the selected ticket, and search/filter values. Statistics are derived from the current ticket state, so they automatically update after a successful status change.

Status changes use an optimistic update: the UI and Zustand state update immediately, then a `PATCH /tickets/:id` request persists the change to JSON Server. If the request fails, the previous ticket data is restored and an error is shown.

Search and filtering are combined in `App.jsx` with a memoized derived ticket list. A ticket must match the search term, selected status, and selected priority to appear.

## AI tools used

AI tools were used for development assistance, code review, and documentation.
