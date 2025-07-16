# Sri Lanka Train Tracker - API Backend

This repository hosts the RESTful API backend for the **Sri Lanka Train Tracker System**, a real-time train monitoring platform designed for the Sri Lanka Railways Department. The backend supports real-time GPS data ingestion, management of train-related data, and provides secure, scalable endpoints for the client application.

---

## 🚀 Features

- Real-time train data ingestion from IoT simulators
- RESTful APIs for train, engine, routes, schedules, trips, stations, and users
- JWT-based authentication and authorization
- Microservice-based architecture
- MongoDB for real-time ingestion data, MySQL for relational data
- Secure API Gateway with role-based access control
- Versioned API support (e.g., `/v1/trains/summary`)

---

## 🧱 Microservices Structure

- **Data Ingestion Service**: Receives GPS data, applies reverse geocoding, stores in MongoDB
- **Train Location Service**: Processes and summarizes location data for real-time views
- **Engine & Train Service**
- **Line & Route Service**
- **Trip, Schedule, and Station Service**
- **User Service**: Handles auth, registration, and user data

---

## 🔧 Tech Stack

- **Node.js + Express**
- **MongoDB** (Cloud Atlas)
- **MySQL** (via DigitalOcean DB Cluster)
- **JWT** for security
- **Nginx**, **Cloudflare**, **PM2**, **Docker (planned)**

---

## 📁 Project Structure
```bash
/<service-name>/
├── routes/
├── controllers/
├── models/
├── middlewares/
└── utils/
```

---

## 🔐 Security

- API Gateway validation using JWT
- HTTPS via Nginx and SSL (Cloudflare Edge Cert)
- Input validation and role-based restrictions
- Logs and monitoring for auditing

---

## 🧪 Testing

- **Jest** for unit testing
- Endpoint access control & security tests
- Stress-tested with concurrent data inputs
