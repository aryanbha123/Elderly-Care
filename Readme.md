# Elderly Care

> A MERN platform that connects families looking after elderly relatives with doctors and caregivers: appointments, caregiver bookings, care history and real-time family-doctor chat.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## About

Elderly Care is a full-stack web app with separate dashboards for **families**, **doctors** and **caregivers**. A family member registers the elderly people they look after, books doctor appointments and caregiver visits for them, reviews their care history, and chats with doctors in real time. Doctors and caregivers manage the appointments and bookings assigned to them.

## Features

### Family
- Add, edit and remove the elderly people under their care.
- Browse doctors and book appointments for an elderly person.
- Browse caregivers and book a visit by service type (Cleaning, Cooking, Assistance).
- View an elderly person's history of caregiver bookings and doctor appointments.
- Consult a doctor through a real-time chat (Socket.IO).

### Doctor
- Today's appointments, upcoming appointments and full history.
- Update appointment status (Pending, Confirmed, Completed, Cancelled).
- Patients view and chat with families.

### Caregiver
- View bookings assigned to them and mark them Pending or Completed.
- Booking history.

### Platform
- JWT authentication (7-day tokens) with bcrypt-hashed passwords; roles: `elderly`, `caregiver`, `doctor`, `family`. Doctors must provide a degree and specialization.
- Role-based protected routes on the frontend (`/doctor`, `/caregiver`, `/family`).
- Public landing page with About, Services, Features and Contact sections.
- Toast notifications and lazy-loaded pages.

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, React Router 7, Redux Toolkit, Axios, MUI 7, Tailwind CSS 4, Socket.IO client, dayjs, react-toastify |
| Backend | Node.js (ES modules), Express 5, Mongoose 8, JSON Web Tokens, bcryptjs, Socket.IO, dotenv |
| Database | MongoDB |

## Project Structure

```
Elderly-Care/
├── backend/
│   ├── index.js            # REST API server
│   ├── soc.js              # Socket.IO + chat server (port 5000)
│   ├── chat.js             # chat REST routes
│   ├── controllers/        # auth, doctor, appointment, careTakers, elderly
│   ├── routes/             # Express routers
│   ├── models/             # User, Appointment, CaregiverBooking, Chat, Message, Emergency
│   ├── middlewares/        # JWT auth middleware
│   └── utils/              # token generation
└── frontend/
    └── src/
        ├── App.jsx         # role-based routes
        ├── auth/           # ProtectedRoute (UserRoutes, RoleRoutes)
        ├── pages/          # Home (landing), Login, Register
        ├── view/           # doctor/, caregiver/, family/, elderly/ dashboards
        ├── components/     # landing page sections, Header, Sidebar
        ├── redux/          # store, user slice and thunks
        └── config.js       # BASE_URL of the REST API
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend (REST API)

```bash
cd backend
npm install
```

Create `backend/.env` with:

| Variable | Purpose |
|---|---|
| `PORT` | API port. The frontend expects `3001` (see `frontend/src/config.js`); the server falls back to `5000` |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |

```bash
npm run dev          # nodemon index.js
```

### 2. Backend (chat server)

The Socket.IO chat server runs as a separate process on port 5000 and uses the same `.env`:

```bash
cd backend
npm run socket       # nodemon soc.js
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173 (the origin allowed by the backend CORS config)
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## API Endpoints

REST API (`index.js`):

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `GET` | `/api/auth/profile` | Current user's profile (auth required) |
| `GET` | `/api/doctors` | List doctors |
| `GET` | `/api/doctors/:id` | All appointments for a doctor |
| `GET` | `/api/doctors/today/:id` | A doctor's appointments today |
| `GET` | `/api/doctors/upcoming/:id` | A doctor's upcoming appointments |
| `PUT` | `/api/doctors/status/:id` | Update an appointment's status |
| `POST` | `/api/appointments/book/:id` | Book a doctor appointment |
| `GET` | `/api/care` | List caregivers |
| `POST` | `/api/careTakerBookings` | Create a caregiver booking |
| `DELETE` | `/api/careTakerBookings/:id` | Delete a caregiver booking |
| `GET` | `/api/careTakerBookings/:caregiverId` | Bookings for a caregiver |
| `GET` | `/api/careTakerBookings/bookings/today/:caregiverId` | A caregiver's bookings created today |
| `PUT` | `/api/careTakerBookings/bookings/:bookingId/status` | Set booking status (`Pending` or `Completed`) |
| `POST` | `/api/elder` | Create an elderly profile |
| `GET` | `/api/elder` | List elderly profiles |
| `GET` | `/api/elder/:id` | Get one elderly profile |
| `GET` | `/api/elder/family/:familyId` | Elderly profiles created by a family member |
| `PUT` | `/api/elder/:id` | Update an elderly profile |
| `DELETE` | `/api/elder/:id` | Delete an elderly profile |
| `GET` | `/api/history/:id` | Caregiver bookings and appointments for an elderly person |

Chat server (`soc.js`, port 5000):

| Method / event | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat/create` | Create or fetch a chat between two participants |
| `GET` | `/api/chat/:chatId` | Get a chat |
| `GET` | `/api/chat/:chatId/messages` | List messages |
| `POST` | `/api/chat/:chatId/messages` | Send a message |
| socket `joinChat` | | Join a chat room |
| socket `sendMessage` | | Save a message and broadcast it to the room |

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
