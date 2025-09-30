# GreenBiller Store Web (React)

A web application for store management, built with **React** and **Vite**. This project uses **Redux** for state management and integrates **Redux Datatables** for tabular data display. Authentication and routing are implemented with protected routes to ensure only authenticated users can access the main layout.

## Features

- ⚡️ Fast development environment with Vite
- 🗃 State management using Redux
- 📊 Data tables powered by Redux Datatables
- 🔒 Protected routes: only authenticated users can access the main layout
- 🧑‍💻 Mock authentication (for now), easy to connect to backend
- 🖥 Responsive UI (in progress)
- 💾 Session management via localStorage (to be updated to JWT or other backend-generated token)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git

cd greenbiller_store_web_react

# Install dependencies
npm install
# or
yarn install
```

### Running the App

```bash
# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Authentication Flow

- The app currently uses **mock data** for login authentication.: User email : test@example.com , Password : 123456
- Upon successful login, the mock user ID and token are saved to `localStorage`.
- This token is used for session validation and route protection.
- **IMPORTANT:** When integrating with your backend, update the authentication logic to use a proper session token (e.g., JWT) issued by the backend.

## Routing & Layouts

- **AuthLayout**: Handles login and authentication UI.
- **MainLayout**: Entry point for authenticated users.
- **Protected Routes**: Users must be authenticated to access main features.

## Responsive Design

- The UI is **not fully responsive yet**. Improvements are planned.

## Connecting to Backend

- Replace the mock login logic with API calls to your authentication server.
- Update session storage to use the token issued by your backend (preferably JWT or similar).

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**Note:** If you have questions or need support, please open an issue in the repository.
