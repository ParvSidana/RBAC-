# **RBAC System**

This repository implements a **Role-Based Access Control (RBAC)** system with secure authentication, authorization, and user role management.

---

## **Features**
- **User Roles**: Supports three roles: `Admin`, `Moderator`, and `User`.
- **Authentication**:
  - User login, registration, and logout.
  - JWT-based authentication for secure session management.
- **Authorization**:
  - Role-based access for `Admin`, `Moderator`, and `User`.
  - Admin can update user roles.
- **Database**: MongoDB is used for user data storage with Mongoose for schema definitions.

---

## **API Endpoints**

### **Authentication Routes**
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/api/auth/register`   | Register a new user             |
| POST   | `/api/auth/login`      | Log in an existing user         |
| POST   | `/api/auth/logout`     | Log out a user (JWT required)   |

### **Role-Based Routes**
| Method | Endpoint               | Description                                        |
|--------|------------------------|----------------------------------------------------|
| GET    | `/api/admin`           | Accessible only to users with the `Admin` role     |
| GET    | `/api/moderator`       | Accessible only to users with the `Moderator` role |
| GET    | `/api/user`            | Accessible to all authenticated users             |
| PATCH  | `/api/update-role`     | Admin updates a user's role                       |


---

## **User Roles**

### **Admin**
- Full access, including managing user roles.
- Can access `/admin` and `/update-role`.

### **Moderator**
- Limited administrative tasks.
- Can access `/moderator`.

### **User**
- Standard user access.
- Can access `/user`.

---

# Project Setup Guide

## **Setup and Installation**

### **Clone the Repository**
```bash
git clone https://github.com/ParvSidana/RBAC-.git
cd backend
```

### **Install Dependencies**
```bash
npm install
```

## Set Up Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```env
PORT=8000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@gmail.com
MODERATOR_EMAIL=moderator@gmail.com
```
---

# Key Middleware

### `verifyJWT`

This middleware validates the JWT token to ensure that the user is authenticated. It checks if the request contains a valid JWT token and, if valid, attaches the user data to `req.user`. This is essential for protecting routes and ensuring that only authenticated users can access them.

### `verifyAdmin`

This middleware checks if the user’s role is `Admin`. It is used to protect routes like `/admin` and `/update-role` from unauthorized access. If the user is not an Admin, they will be denied access to these routes.

### `verifyModerator`

This middleware ensures that only users with the `Moderator` role can access routes like `/moderator`. If the user does not have the Moderator role, they will be denied access to these routes.

