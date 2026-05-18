# GlobalTNA Job Requests Portal 🌐💼

A premium, modern, full-stack application designed to track and manage job requests. Built with a fast **Express & Node.js backend** powered by **MongoDB/Mongoose**, and a robust, highly optimized **Next.js 16 frontend** utilizing **React 19, TypeScript, and Tailwind CSS v4**.

---

## 🏗️ Project Architecture

This repository is structured as a clean monorepo containing two decoupled systems:
- **`backend/`**: A Node.js and Express RESTful API communicating with a MongoDB instance. Uses ES Modules, Mongoose for object modeling, and nodemon for hot-reloads.
- **`frontend/`**: A modern Next.js single-page application leveraging React Server Components, Client Actions, and a responsive glassmorphic Tailwind CSS UI to track, filter, and transition job request statuses.

---

## 🔑 Environment Variables

The project requires configuring environment variables for both the backend and frontend components.

### 🔌 Backend Config (`/backend/.env`)

Create a `.env` file inside the `backend` directory:

```env
# MongoDB Connection String (Required)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=jobglobal

# Port to run Express server (Optional - Defaults to 5000)
PORT=5000
```

### 💻 Frontend Config (`/frontend/.env.local`)

By default, the Next.js API route layer will route requests to `http://localhost:5000`. If you run your backend on a custom port or separate server, create a `.env.local` file inside the `frontend` directory:

```env
# Backend API Base URL (Optional - Defaults to http://localhost:5000)
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Setup & Installation Instructions

Follow these instructions to set up the development environment from scratch:

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18.x or above recommended)
- **npm** (v9.x or above) or **yarn / pnpm**
- **MongoDB** (Local instance or MongoDB Atlas Cloud instance)

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file as described in the [Environment Variables](#-environment-variables) section.

---

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required frontend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure `.env.local` if your backend port differs from `5000`.

---

## 🏃 Run Instructions

To run the application, you must run both the backend Express server and the frontend Next.js development server simultaneously.

### 🔌 Running the Backend

#### Development Mode (with hot-reloading)
Runs node under `nodemon` to watch file changes:
```bash
cd backend
npm run dev
```

#### Production Mode
Runs the standard node server:
```bash
cd backend
npm start
```

*The backend will boot up at `http://localhost:5000` (or your configured `PORT`).*

---

### 💻 Running the Frontend

#### Development Mode
Runs the Next.js development server:
```bash
cd frontend
npm run dev
```
*The frontend will run at `http://localhost:3000`.*

#### Production Build & Run
To compile the frontend project for production and execute it:
```bash
cd frontend
npm run build
npm start
```

---

## 📋 REST API Reference

The backend exposes a highly robust, fully error-handled REST API on `/api/jobs`:

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/jobs` | Retrieves all job requests, sorted by newest first | `category` (string), `status` (`Open`\|`In Progress`\|`Closed`) |
| **GET** | `/api/jobs/:id` | Retrieves a single job request by ID | None |
| **POST** | `/api/jobs` | Creates a new job request | None |
| **PATCH** | `/api/jobs/:id` | Updates **only** the status of a job | None |
| **DELETE**| `/api/jobs/:id` | Deletes a job request by ID | None |

### Request & Response Models

#### 1. Job Schema Definition
```json
{
  "_id": "64efc12dbfa097a8e09f8c41",
  "title": "Software Engineer Request",
  "description": "Develop and maintain mission-critical full-stack applications.",
  "category": "Engineering",
  "location": "Remote",
  "contactName": "John Doe",
  "urgency": "High",
  "status": "Open", 
  "createdAt": "2026-05-17T17:00:00.000Z",
  "updatedAt": "2026-05-17T17:01:00.000Z"
}
```

#### 2. Create Job Request (`POST /api/jobs`)
**Payload format:**
```json
{
  "title": "Frontend Developer",
  "description": "Must be proficient in Next.js 16 and Tailwind v4.",
  "category": "Engineering",
  "location": "Boston Office",
  "contactName": "Alice Vance",
  "urgency": "Medium"
}
```

#### 3. Update Job Status (`PATCH /api/jobs/:id`)
**Payload format:**
```json
{
  "status": "In Progress" // Allowed values: 'Open', 'In Progress', 'Closed'
}
```

---

## 📁 Repository Structure

```filepath
GlobalTNA Assesment/
├── backend/
│   ├── config/              # DB and setup configs
│   ├── middleware/          # errorHandler and custom middleware
│   ├── models/              # JobRequest Mongoose schemas
│   ├── routes/              # Express API Route controllers
│   ├── package.json         # Backend scripts and dependencies
│   ├── server.js            # Express application entrypoint
│   └── .env                 # Backend environment secrets
├── frontend/
│   ├── app/                 # Next.js App Router (pages & API proxies)
│   │   ├── api/jobs/        # Frontend API routes (proxies queries to backend)
│   │   ├── layout.tsx       # Main page layout HTML template
│   │   └── page.tsx         # Main dashboard view
│   ├── public/              # Static assets
│   ├── package.json         # Frontend scripts & styles config
│   ├── tailwind.config.ts   # UI / styling customization
│   └── tsconfig.json        # TypeScript setup
└── README.md                # System documentation
```

---

## 🛡️ Error Handling
The backend is equipped with a centralized error handler `errorHandler.js` that intercepts MongoDB validation, cast, and connection errors, and gracefully formats them into readable JSON responses:
```json
{
  "message": "Internal Server Error details or specific validation fields warning"
}
```
