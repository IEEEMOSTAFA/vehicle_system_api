

 
 🚗 Vehicle System API

A production-ready Vehicle Rental Management API built using Node.js, Express, TypeScript, and PostgreSQL, with complete JWT authentication and role-based access control.

🚀 Live API (Deployed)

Base URL:
🔗 https://vehicle-system-dm9htps5q-ieee-mostafas-projects.vercel.app

📦 Project Name

vehicle_system_api

📥 How to Use This Project

Follow these steps to clone and run the project locally.

🔧 1. Clone the Repository
git clone https://github.com/IEEEMOSTAFA/vehicle_system_api.git

📂 2. Go Inside the Project Folder
cd vehicle_system_api

📦 3. Install Dependencies
✔️ Production Packages
npm install bcryptjs dotenv express jsonwebtoken pg


Installed:

bcryptjs → Password hashing

dotenv → Environment variables

express → Web framework

jsonwebtoken → JWT authentication

pg → PostgreSQL driver

🔧 Development Packages
npm install -D @types/express @types/jsonwebtoken @types/node @types/pg tsx typescript


Installed Dev Tools:

typescript → TypeScript compiler

tsx → Fast TypeScript runner

@types/* → Required TypeScript definitions

🔐 4. Create a .env File

Create a .env file in the project root:

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/vehicle_system
JWT_SECRET=YOUR_SECRET_KEY


Make sure your PostgreSQL database exists:

CREATE DATABASE vehicle_system;

▶️ 5. Start Development Server
npm run dev


Project will run using tsx with hot reload.

📦 6. Build for Production
npm run build