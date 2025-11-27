# Frontend Requirements

This document outlines the requirements for setting up and running the frontend application.

## Environment Variables

Currently, the frontend does not use any environment variables. The API base URL is hardcoded to `http://localhost:5000/api` in `src/api/axios.js`.

## Dependencies

The following packages are required and will be installed via `npm install`:

### Production Dependencies
- **axios**: Promise based HTTP client for the browser and node.js.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for working with the DOM.
- **react-router-dom**: DOM bindings for React Router.
- **framer-motion**: A production-ready motion library for React.
- **lucide-react**: Icon library.
- **tailwindcss**: Utility-first CSS framework.
- **@tailwindcss/vite**: Tailwind CSS Vite plugin.

### Development Dependencies
- **vite**: Next Generation Frontend Tooling.
- **eslint**: Pluggable JavaScript linter.

## Installation & Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Route Verification & Test Cases

The following routes have been implemented and verified:

| Route | Component | Description | Test Case |
| :--- | :--- | :--- | :--- |
| `/` | `Hero.jsx` | Home page with search widget. | Load page, verify search form appears. |
| `/search` | `SearchResult.jsx` | Displays bus search results. | Perform search, verify list of buses (fetched from API). |
| `/bus/:id` | `SeatSelection.jsx` | Seat selection for a specific bus. | Click "View Seats", select seats, click "Book", verify success alert. |
| `/login` | `Login.jsx` | User login page. | Enter valid credentials, verify redirect to Home. |
| `/signup` | `Signup.jsx` | User registration page. | Enter valid details, verify account creation and redirect. |
| `/my-bookings` | `MyBooking.jsx` | User's booking history. | Navigate after booking, verify booking appears, test "Cancel" button. |
| `/contact` | `ContactUs.jsx` | Contact form. | Load page, verify form fields. |

### Notes
- Ensure the backend server is running on `http://localhost:5000` before testing API-dependent features (Search, Login, Booking).
- The `SeatSelection` page navigates to `/my-bookings` upon successful booking.
