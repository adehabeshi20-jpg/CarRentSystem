# Car Rental Management System

## Project Title

**Car Rental Management System**

## Project Objective

To develop a full-stack web application for managing car rentals efficiently. The system allows users to browse, book, and pay for cars online while enabling administrators to manage inventory, bookings, and payments easily.

---

## Technologies Used

**Frontend:** React, Vite, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MySQL
**Authentication & Security:** JWT, bcrypt, dotenv, helmet, express-validator
**Other Tools:** Nodemon, Multer, CORS

---

## Features

* User registration and login
* Browse available cars with details
* Book a car and make payments
* Admin panel for managing cars, bookings, and payments
* Real-time booking and availability updates
* Secure authentication and data validation

---

## Screenshots

*Add screenshots of your application here (homepage, booking page, admin panel, etc.)*

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/adehabeshi20-jpg/CarRentSystem.git
cd CarRentSystem
```

### 2. Backend Setup

```bash
cd Backend
npm install
```


* Start backend server:

```bash
npm run dev
```

You should see:

```
Server running at Port 2530
Database connected to CarRentDb successfully!
```

Your backend API will be accessible locally at:

```
http://localhost:2530
```

---

### 3. Frontend Setup

```bash
cd ../Frontend/car-rent
npm install
```

* Update `.env` with backend URL:

```
VITE_API_URL=http://localhost:2530
```

* Start frontend:

```bash
npm run dev
```

* For production deployment on Netlify:

  * Build frontend:

  ```bash
  npm run build
  ```

  * Set Netlify **publish directory** to `dist`.
  * Add environment variable on Netlify:

  ```
  VITE_API_URL=https://<your-backend-deploy-url>
  ```

---

## Database Schema / ER Diagram

**Tables:**

1. Users: id, name, email, password, role
2. Cars: id, name, type, price, availability
3. Bookings: id, user_id, car_id, start_date, end_date, status
4. Payments: id, booking_id, amount, payment_method, status

*Add an ER diagram image if possible.*

---

## Challenges Faced & Solutions

* **Database Connection Errors:** Fixed by checking `.env` configuration and MySQL server status.
* **Netlify Deployment 404 Errors:** Corrected frontend `vite.config.js` `base` path and set publish directory to `dist`.
* **Authentication Errors:** Fixed JWT and bcrypt integration for secure login.

---

## Future Improvements

* Add mobile app version
* Email notifications for bookings
* Advanced reporting for admin
* Online payment gateway integration

---

## Deployment Link

* Frontend: [https://carrentsystem.netlify.app](https://carrentsystem.netlify.app)
* Backend: [https://your-backend-deploy-link.com](https://your-backend-deploy-link.com)

---

## Author

**Abdulrahman Asfaw**
GitHub: [https://github.com/adehabeshi20-jpg](https://github.com/adehabeshi20-jpg)
Email: [your-email@example.com](mailto:your-email@example.com)

---

## License

This project is for educational purposes for the Full Stack Development Course at Mizan Institute of Technology.
