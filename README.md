# 🐾 Pet Shop API

REST API for a pet adoption platform built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

This backend powers two independent frontend applications.
```text
                  🐾 Pet Shop API
                        │
        ┌───────────────┴───────────────┐
        │                               │
🌐 Pet Shop Client              👑 Admin Panel
        │                               │
 Public visitors              Administrators
 Registered users
```

---

## 🔗 Related Repositories

- 🌐 [Pet Shop Client](https://github.com/ivannashchokalo/pet-shop-client)

- 👑 [Pet Shop Admin Panel](https://github.com/ivannashchokalo/pet-shop-admin)

---

> ⚠️ **Important**
>
> The Client and Admin Panel share the same authentication cookies.
> When testing both applications at the same time, use different browser windows (Incognito or another browser) to avoid cookie conflicts.

---

## 🏗 Architecture

The backend follows a layered architecture:

Controller → Service → Model

- 🎮 Controllers handle HTTP requests and responses.
- ⚙️ Services contain business logic.
- 🗄 Models manage database access through Mongoose.
- 🛡 Middleware is responsible for authentication, authorization and validation.

---

## 🚀 Highlights

- 🔐 Session-based authentication with Access & Refresh Tokens
- 🍪 Secure HTTP-only cookie authentication
- 🔄 Refresh token rotation
- ❤️ Optimized favorites system with separate API endpoints
- 📩 Animal reservation system for guests and registered users
- 🖼 Cloudinary image upload and automatic optimization
- 🔎 Text search, filtering, sorting & pagination
- 👑 Role-based admin authorization
- 📧 Password reset via email using JWT
- ✅ Request validation with Celebrate & Joi

---

# ✨ Features

## 🌐 Public Features

Available without authentication.

- 🐶 Browse all available animals
- 📄 View detailed animal information
- 🎯 Filter animals by:
  - breed
  - sex
  - price range
- ↕️ Sort animal listings
- 📩 Reserve animals
- 👤 Register a new account
- 🔑 Log in
- 📧 Request password reset

---

## 👤 User Features

Available after authentication.

- ❤️ Add animals to favorites
- 💔 Remove animals from favorites
- 📋 View favorite animals
- 🧹 Clear favorite list
- 📩 View personal reservation requests
- ❌ Cancel reservation requests
- ✏️ Change profile name
- 🔒 Change password

---

## 👑 Admin Features

Protected by authentication and role-based authorization.

- ➕ Create new animals
- ✏️ Edit animal information
- 🗑 Delete animals
- 🖼 Upload up to 5 images per animal
- 📬 View all reservation requests
- 🔄 Update request statuses
- ❌ Delete requests
- 📊 Access dashboard statistics

---


## 🔐 Authentication

The application uses **session-based authentication**.

After login:

- 🔑 Access and refresh tokens are generated.
- 🗃 Sessions are stored in MongoDB.
- 🍪 Tokens are sent as secure HTTP-only cookies.
- 🔄 Expired sessions are renewed using refresh token rotation.

JWT is used only for password recovery.

---

# ❤️ Favorites

- ❤️ Favorite animals are stored as **Animal ObjectIds** in the **User** document.
- 🆔 The API provides separate endpoints for favorite IDs and paginated favorite animals.
- ⚡ This keeps favorite state checks fast while minimizing unnecessary data transfer.

---


# 📩 Reservation requests

- 🌐 Guests can reserve animals without creating an account.
- 👤 Registered users can view and manage their reservation requests.
- ❌ Requests can be canceled while they are in the **New** status.

---

# 🖼 Image Upload

- ☁️ Images are uploaded directly to **Cloudinary**.
- 🚀 Images are uploaded using Multer Memory Storage.
- ✨ Images are automatically optimized before storage.
- 🖼 Up to **5 images** can be uploaded for each animal.

---

# 🔎 Search, Filtering & Sorting

- 🔍 Search animals
- 🐶 Filter by animal type
- 🦴 Filter by breed
- 🚻 Filter by sex
- 💰 Filter by price range
- ↕️ Sort results
- 📑 Paginated responses

---

# 📧 Password Recovery

- 📧 Password reset via email
- 🎟 Secure JWT reset tokens
- ⏱ Reset links expire after **15 minutes**
- 🔒 All active sessions are revoked after a successful password reset

---

# 📊 Statistics

The API provides summary statistics for the **Admin Panel**, including:

- 🐶 Animals by category
- 📦 Available animals
- 🏡 Happy owners

---

# ✅ Validation

- 📝 Request body validation
- 🔍 Query parameter validation
- 🛣 URL parameter validation
- 🆔 MongoDB ObjectId validation
- ✅ Validation powered by **Celebrate** and **Joi**

---

# ⚠️ Error Handling

- ⚠ Centralized error handling
- 🚫 Consistent HTTP error responses
- 📄 Custom 404 responses

---

# 🛠 Tech Stack

### 🚀 Backend

- 🟢 Node.js
- ⚡ Express.js

### 🗄 Database

- 🍃 MongoDB
- 📑 Mongoose

### 🔐 Authentication

- 🔑 Session-based authentication
- 🎫 Access token
- 🔄 Refresh token
- 🍪 HTTP-only cookies
- 🔒 bcrypt

### ✅ Validation

- ✔️ Celebrate
- 📝 Joi

### ☁️ File Storage

- 📂 Multer
- ☁️ Cloudinary

### 📧 Email

- 📨 Nodemailer
- 📄 Handlebars

### ⚙️ Utilities

- 🍪 Cookie Parser
- 🌍 CORS
- 🔐 dotenv
- 📋 pino-http

---

# 📂 Project Structure

```text
.
├── src
│   ├── constants
│   ├── controllers
│   ├── db
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── templates
│   ├── utils
│   ├── validations
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

---

# 🛡 Security

- 🍪 HTTP-only cookies
- 🔒 Secure cookies
- 🌐 SameSite=None
- 🔑 Password hashing with bcrypt
- ⏳ Session expiration

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v20 or later)
- npm
- MongoDB

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/ivannashchokalo/pet-shop-api.git
```

Go to the project directory:

```bash
cd pet-shop-api
```

Install dependencies:

```bash
npm install
```

### ⚙️ Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the environment variables with your own configuration.

The frontend URL variables (`CLIENT_LOCAL`, `ADMIN_LOCAL`, `CLIENT`, `ADMIN`) are used for the backend CORS configuration.

### ▶️ Run the application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---


## 🌐 Deployment

The API is deployed on **Render**.

**Base URL**

```text
https://pet-shop-api-tmbd.onrender.com

---


# 🚀 API Endpoints

## 🔐 Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/admin/login
POST /auth/logout
POST /auth/refresh
POST /auth/request-reset-email
POST /auth/reset-password
GET  /auth/me
```

---

## 🐾 Animals

```http
GET    /animals
GET    /animals/filters
GET    /animals/:animalId

POST   /animals
PATCH  /animals/:animalId
DELETE /animals/:animalId
```

---

## 👤 Users

```http
GET    /users/favorites
PATCH  /users/favorites
DELETE /users/favorites

GET    /users/favorites/animals
DELETE /users/favorites/animals

GET    /users/requests
DELETE /users/requests/:reqId

PATCH  /users/change-name
PATCH  /users/change-password
```

---

## 📩 Requests

```http
GET    /requests
POST   /requests
PATCH  /requests/:reqId
DELETE /requests/:reqId
```

---

## 📊 Statistics

```http
GET /statistics
```

---


## 👩‍💻 Author

**Ivanna Shchokalo**  
Junior Full-Stack Developer

- 💼 LinkedIn: https://linkedin.com/in/ivannashchokalo
- 🌐 GitHub: https://github.com/ivannashchokalo
