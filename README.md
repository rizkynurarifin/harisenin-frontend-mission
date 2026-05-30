# Harisenin Fullstack Missions 🚀

This repository contains a collection of web development projects completed during the **Harisenin Bootcamp**. The projects have evolved from purely Frontend to a complete Full-Stack architecture, focusing on building modern, responsive, and high-performance web applications with a robust backend.

## 🌐 Live Demo

* **Frontend (Chillix Movie App)**: [https://chillix-movie-app-harisenin.vercel.app](https://chillix-movie-app-harisenin.vercel.app)
* **Backend API**: Deployed on Vercel

## 🛠️ Tech Stack

**Frontend:**
* **Framework:** [React 19](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router v7](https://reactrouter.com/)

**Backend & Database:**
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [TiDB Cloud (MySQL compatible)](https://tidbcloud.com/)
* **Authentication:** JWT (JSON Web Tokens) & bcrypt
* **Email Service:** Nodemailer (Gmail SMTP)

## 📂 Project Structure

This repository is organized into a full-stack monorepo structure:

* `/src` - React Frontend (Chillix Movie App)
* `/backend` - Node.js & Express REST API Server
* `/public` - Static assets and uploads

## 🚀 Getting Started

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rizkynurarifin/harisenin-mission.git
    ```
2.  **Navigate to the folder:**
    ```bash
    cd harisenin-mission
    ```
3.  **Install Frontend dependencies:**
    ```bash
    npm install
    ```
4.  **Install Backend dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```
5.  **Setup Environment Variables:**
    Create a `.env` file in the `backend` folder based on your TiDB and email credentials.

6.  **Run the development servers:**
    *   Frontend: `npm run dev` (in the root directory)
    *   Backend: `npm run dev` (inside the `backend` folder)

## 📝 Author

**Rizky Nur Arifin**
* Fullstack Web Developer
* [LinkedIn](https://www.linkedin.com/in/rizkynurarifin/) | [GitHub](https://github.com/rizkynurarifin)

---
*Developed as part of the Harisenin Fullstack Web Development Bootcamp.*