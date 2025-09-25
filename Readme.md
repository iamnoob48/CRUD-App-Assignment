# Productivity App with Role-Based Authentication

A full-stack productivity app with **Node.js, Express, Prisma, React, and TailwindCSS**, featuring **user authentication, role-based access, task management**, and an **admin dashboard**.

---

## Features

- **Authentication**: JWT-based login & registration, password hashing
- **Role-Based Access**: User vs Admin with protected routes
- **Tasks**: Add, update, delete, undo completion
- **Admin Dashboard**: View users,Add Users, promote/demote admins, remove users
- **Validation & Error Handling**: Express-validator and frontend alerts
- **Frontend**: React + TailwindCSS with modals and dashboards

---

## Tech Stack

**Backend**: Node.js, Express, Prisma, PostgreSQL/MySQL  
**Frontend**: React, TailwindCSS  
**Auth**: JWT  
**Validation**: express-validator  

---

## Getting Started

1. Clone the repo:  
```bash
git clone https://github.com/iamnoob48/productivity-app.git
cd CRUD-App-Assignment
```
2. Install all the dependencies
   ```bash
   #for frontend
   cd /frontend
   npm i or npm install

   #for backend
   cd /backend
   npm i or npm install
   
   ```
3. Setup .env variables
   ```bash
   DATABASE_URL= <your-db-url>
   JWT_KEY = <your-jwt-secret>
   PORT = 5000
   ```
4. Run Prisma migrations:
   ```bash
   #migrate prisma.schema file
   npx prisma migrate dev --name init
5. Start frontend and backend servers
   ```bash
   cd Frontend
   npm run dev
   //for backend
   cd Backend
   npm run dev
---
## API Overview & Documentation
You can explore and test the API endpoints using the published Postman documentation:
👉 [View Postman Docs](https://documenter.getpostman.com/view/48416076/2sB3QCTEDD)

- **Auth** : /api/v1/auth/register, /api/v1/auth/login
- **Task CRUD route** : /api/v1/todo
- **Admin** : /api/v1/admin
- **User** : /ap1/v1/user
---

## CORS Solution

- **Proxy lib in React.js** : Used a proxy server to bypass the CORS error

---

## Scalability Notes
- Can use Redis caching for frequent data queries
- Backend can be split into microservices for auth, tasks, and admin
- Multiple instances with load balancing for high traffic
- Deployable with Docker for consistent environments



   


