# 🎟️ Event Booking & Management App

A full-stack event booking web application built with the MERN stack. Users can browse, search, filter, and book events while admins can create and manage events through a dedicated admin panel.

## 🔗 Live Demo

- **Frontend:** https://event-booking-app-one-azure.vercel.app
- **Backend API:** https://event-booking-app-u9xf.onrender.com

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js (Vite), React Router DOM, Axios, Context API, React Hot Toast |
| Backend | Node.js, Express.js, RESTful APIs |
| Database | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| Deployment | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## ✨ Features

### 👤 User
- Register and login with secure JWT authentication
- Browse all available events
- Search events by title
- Filter events by category (Music, Sports, Tech, Food, Art, Other)
- View detailed event information (date, location, capacity, category)
- Book events with real-time capacity validation
- View all personal bookings in a dashboard
- Cancel confirmed bookings

### 🛡️ Admin
- Create new events with full details
- Edit existing events
- Delete events
- View all events with management controls
- Role-based access control (user / admin)
- Capacity enforcement to prevent overbooking

---

## 📁 Project Structure
event-booking-app/
│
├── client/ # React frontend (Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ └── ProtectedRoute.jsx
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ ├── pages/
│ │ │ ├── EventsPage.jsx
│ │ │ ├── EventDetailPage.jsx
│ │ │ ├── LoginPage.jsx
│ │ │ ├── RegisterPage.jsx
│ │ │ ├── DashboardPage.jsx
│ │ │ └── AdminPage.jsx
│ │ ├── utils/
│ │ │ └── axios.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json
│
├── server/ # Node.js + Express backend
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── eventController.js
│ │ └── bookingController.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Event.js
│ │ └── Booking.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── events.js
│ │ └── bookings.js
│ ├── index.js
│ └── package.json
│
├── .gitignore
└── README.md


---

## 🔌 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and receive JWT token | No |

### 🎪 Event Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/events | Get all events | No |
| GET | /api/events/:id | Get single event by ID | No |
| POST | /api/events | Create a new event | Admin only |
| PUT | /api/events/:id | Update an event | Admin only |
| DELETE | /api/events/:id | Delete an event | Admin only |

### 🎟️ Booking Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/bookings/:eventId | Book an event | Yes |
| GET | /api/bookings/my | Get logged-in user's bookings | Yes |
| PATCH | /api/bookings/cancel/:id | Cancel a booking | Yes |

---

## 🚀 Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sujal13-commits/Event-Booking-App.git
cd Event-Booking-App
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🗄️ Database Schema

### User

name String required
email String required, unique
password String required (hashed)
role String enum: ['user', 'admin'], default: 'user'
timestamps


### Event

title String required
description String required
date Date required
location String required
category String enum: ['music','sports','tech','food','art','other']
capacity Number required
image String optional
createdBy ObjectId ref: User
timestamps


### Booking

user ObjectId ref: User, required
event ObjectId ref: Event, required
status String enum: ['confirmed', 'cancelled'], default: 'confirmed'
timestamps


---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://event-booking-app-one-azure.vercel.app |
| Backend | Render | https://event-booking-app-u9xf.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 🔮 Future Improvements

- [ ] Email notifications on booking confirmation
- [ ] Payment gateway integration
- [ ] Event image upload with Cloudinary
- [ ] Pagination for events listing
- [ ] Google OAuth login
- [ ] QR code ticket generation

---

## 👨‍💻 Developer

**Sujal Pagade**
- 📧 Email: sujalpagade13@gmail.com
- 🐙 GitHub: [@sujal13-commits](https://github.com/sujal13-commits)
- 💼 LinkedIn: [Sujal Pagade](https://www.linkedin.com/in/sujal-pagade-998080369/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).