# 🛡️ TechProtect – Device Insurance React Application

## 📋 Overview

**TechProtect** is a modern React-based web application designed for a fictional device insurance company. It allows users to manage their devices, browse insurance plans, and request quotes. This application was built as part of a capstone project to demonstrate full-stack development using modern frontend tools and integration with a mock backend.

---

## 🚀 Key Features

### 🔹 Device Management (CRUD)

- Add, edit, and delete electronic devices (phones, tablets, laptops, etc.)
- Devices are saved to a cloud backend (MockAPI)

### 🔹 Insurance Quote Selection

- Users can view a list of available insurance plans
- After selecting a quote, the details are saved to their device

### 🔹 Filter & Search

- Filter insurance plans by brand using a dropdown menu
- Search for specific devices or plans

### 🔹 Responsive Design

- Fully responsive layout using **Material UI (MUI)**
- Clean UI with dark/light theme toggle

### 🔹 Routing and Navigation

- Multi-page navigation using **React Router**
- Pages include: Dashboard, Add/Edit Device, Insurance Quotes, Quote Confirmation

---

## 🧰 Tech Stack

- **React** – Frontend Framework
- **Vite** – Lightning-fast build tool
- **Material UI (MUI)** – UI components and layout
- **React Router** – Page navigation
- **Formik + Yup** – Form handling and validation
- **MockAPI** – Simulated backend
- **Netlify** – Deployment platform

---

## 🗂️ Folder Structure

```
/src
  /components      → Reusable UI components
  /pages           → Main views (Dashboard, AddDevice, Quotes, etc.)
  /services        → API functions (MockAPI interactions)
  /utils           → Helper functions
  /styles          → Custom CSS and theme config
  App.jsx          → Main app with routing
  main.jsx         → App entry point
```

---

## 📦 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jamie-Sanlam20/react-capstone-project.git
   cd techprotect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**  
   Navigate to `http://localhost:5173`

---

## 🔌 API Reference (MockAPI)

- Base URL: `https://68871b87071f195ca97f46b5.mockapi.io/devices`

### 📱 Endpoints

| Endpoint       | Method | Description         |
| -------------- | ------ | ------------------- |
| `/devices`     | GET    | Fetch all devices   |
| `/devices/:id` | GET    | Fetch single device |
| `/devices`     | POST   | Add new device      |
| `/devices/:id` | PUT    | Update a device     |
| `/devices/:id` | DELETE | Remove a device     |

### 📄 Routing

| Routes                       | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| `/home` or `/`               | Shows application home page                              |
| `/dashboard`                 | Shows all devices with search and filter (by brand)      |
| `/devices/new`               | Adds a new vehicle using Formik + MUI                    |
| `/edit/:id`                  | Edit an existing device                                  |
| `/quotes/:id`                | Shows 3 insurance quotes for selected device             |
| `/confirm/:deviceId/:planId` | Displays confirmation of selected quote + device summary |
| `*`                          | Displays a 404 Not Found page                            |

---

## 📈 Future Enhancements

- Connect to a real backend using Flask or Firebase
- Add authentication (e.g., login/logout)
- Real-time premium calculation
- Admin dashboard for managing insurance plans

---

## 📄 License

This project is for training purposes only.
