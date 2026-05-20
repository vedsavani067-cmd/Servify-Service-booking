# Servify - Service Booking Platform 🛠️

A modern, full-stack **MERN** (MongoDB, Express, React, Node.js) service marketplace that connects skilled service providers with customers seeking quality services.

## 🌟 Features

- **User Authentication** – Secure login/registration with role-based access (Customer/Provider)
- **Service Management** – Providers can create, update, and manage service listings
- **Service Discovery** – Customers can browse and search for services with detailed information
- **Booking System** – Easy booking process with confirmation and status tracking
- **Reviews & Ratings** – Community-driven feedback system for services
- **Role-based Dashboards** – Separate interfaces for customers and service providers
- **Protected Routes** – Secure pages requiring authentication
- **Modal Confirmations** – User-friendly confirmation and success notifications

---

## 🛠️ Tech Stack

### Frontend
- **React 19** – UI library
- **Vite** – Fast build tool and dev server
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Bootstrap 5** – UI framework
- **ESLint** – Code quality

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication tokens
- **Bcrypt** – Password hashing
- **CORS** – Cross-origin support

---

## 📁 Project Structure

```
Servify-Service-booking/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SuccessModal.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ServicesList.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── ProviderDashboard.jsx
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/             # API utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                    # Node.js backend
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── serviceController.js
│   ├── models/                # MongoDB schemas
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── routes/                # API endpoints
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── serviceRoutes.js
│   ├── middleware/            # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/                # Configuration
│   │   └── db.js
│   ├── server.js              # Main server file
│   ├── check_db.js            # Database checker
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud database)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/vedsavani067-cmd/Servify-Service-booking.git
cd Servify-Service-booking
```

**2. Setup Backend**
```bash
cd server
npm install
```

**3. Setup Frontend**
```bash
cd ../client
npm install
```

### Configuration

**Backend (.env file in server directory)**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Frontend (if needed)**
Update API endpoint in `client/src/utils/api.js`

---

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
npm start
```
Server runs on: `http://localhost:5000`

### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📝 Available Scripts

### Backend
```bash
npm start    # Start server
npm run dev  # Start with nodemon
npm test     # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 🔐 User Roles

### Customer
- Browse and search services
- Make service bookings
- View booking history
- Leave reviews and ratings
- Manage profile

### Service Provider
- Create and manage service listings
- View incoming bookings
- Update booking status
- Respond to customer reviews
- Manage profile and services

---

## 📍 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login
- `GET /api/auth/me` – Get current user

### Services (`/api/services`)
- `GET /api/services` – List all services
- `GET /api/services/:id` – Get service details
- `POST /api/services` – Create new service
- `PUT /api/services/:id` – Update service
- `DELETE /api/services/:id` – Delete service

### Bookings (`/api/bookings`)
- `GET /api/bookings` – Get user bookings
- `POST /api/bookings` – Create booking
- `PUT /api/bookings/:id` – Update booking status
- `DELETE /api/bookings/:id` – Cancel booking

### Reviews (`/api/reviews`)
- `POST /api/reviews` – Add review
- `GET /api/reviews/:serviceId` – Get service reviews

---

## 📚 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['customer', 'provider'],
  phone: String,
  address: String,
  createdAt: Date
}
```

### Service
```javascript
{
  title: String,
  description: String,
  category: String,
  price: Number,
  provider: ObjectId (User),
  rating: Number,
  reviews: [ObjectId],
  createdAt: Date
}
```

### Booking
```javascript
{
  service: ObjectId (Service),
  customer: ObjectId (User),
  provider: ObjectId (User),
  status: Enum ['pending', 'confirmed', 'completed', 'cancelled'],
  date: Date,
  amount: Number,
  createdAt: Date
}
```

### Review
```javascript
{
  service: ObjectId (Service),
  customer: ObjectId (User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

---

## 🔧 Configuration Details

### Frontend Configuration
- **Port**: 5173 (Vite default)
- **API Base URL**: Configure in `client/src/utils/api.js`
- **Authentication**: JWT tokens stored in localStorage

### Backend Configuration
- **Port**: 5000
- **Database**: MongoDB
- **Authentication**: JWT with bearer tokens
- **Password Security**: Bcrypt hashing

---

## 📖 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

### MongoDB Connection Error
- Check MongoDB service is running
- Verify connection string in `.env`
- Ensure database is accessible

### CORS Issues
- Check CORS configuration in backend
- Verify frontend URL is whitelisted

### Module Not Found
```bash
cd client
npm install

cd ../server
npm install
```

---

## 🎯 Future Enhancements

- 💳 Payment gateway integration (Stripe/PayPal)
- 📱 Mobile app (React Native)
- 🔔 Real-time notifications (Socket.io)
- 🗺️ Google Maps integration
- ⭐ Advanced search and filtering
- 📊 Analytics dashboard
- 🌍 Multi-language support
- 🔍 Service recommendations

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Vedavati Savani**  
GitHub: [@vedsavani067-cmd](https://github.com/vedsavani067-cmd)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💬 Support & Contact

If you have questions or need help:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

---

## 🎉 Acknowledgments

- Built with ❤️ using MERN stack
- Thanks to React, Express, and MongoDB communities
- Inspired by popular service booking platforms

---

**Last Updated**: May 20, 2026  
**Repository**: https://github.com/vedsavani067-cmd/Servify-Service-booking
