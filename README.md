## 🌍 Live Demo

🔗 [Click here to view the live app](https://password-manager-mern-grom.onrender.com)


# 🔐 Password Manager

A secure and minimal password manager web application built using the MERN stack.

This project includes:

* Google and GitHub OAuth authentication
* JWT-based session management
* User-specific password storage using MongoDB
* React-based responsive frontend

## 🗂 Project Structure

```
root/
├── backend/         # Express.js server with MongoDB
└── frontend/        # React.js frontend (Vite)
```

## 🚀 Getting Started

Follow the steps below to run the project on your local machine.

### ✅ Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* MongoDB (local or cloud instance)

---

## 🔧 Backend Setup (Port: 5000)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

4. Start the backend server:

```bash
npm start
```

---

## 🎨 Frontend Setup (Port: 5173)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder and add the following:

```env
VITE_API_URL=http://localhost:5000
```

4. Start the frontend server:

```bash
npm run dev
```

---

## 📦 Available Features

* 🔐 Login with Google or GitHub
* 🔒 JWT Authentication
* 🔑 Password encryption support (AES planned)
* 📁 User-specific CRUD operations
* 🧭 Responsive and clean UI

---

## 🌐 Running on Localhost

* Backend will be available at: `http://localhost:5000`
* Frontend will be available at: `http://localhost:5173`

Ensure both servers are running concurrently.

---

## 🙌 Contributions

Feel free to fork the repository, raise issues, or submit PRs.

---
