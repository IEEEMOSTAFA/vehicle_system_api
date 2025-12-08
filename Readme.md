
Deploy Link:














-> In this project Name: vehicle_system_api

Install Dependencies
Production Dependencies
npm install bcryptjs dotenv express jsonwebtoken pg

Installed Packages

bcryptjs → Password hashing

dotenv → Load .env variables

express → Main HTTP framework

jsonwebtoken → JWT authentication

pg → PostgreSQL database driver

 Install Development Dependencies
npm install -D @types/express @types/jsonwebtoken @types/node @types/pg tsx typescript

Installed Dev Tools

typescript → TypeScript compiler

tsx → Fast TypeScript runner

@types/* → Required TypeScript type definitions

If you use this Project : You must follow this role:

📥 Clone This Project

Follow these steps to download and run the project on your system.

✅ 1. Clone the Repository

Run the following command in your terminal:

git clone https://github.com/IEEEMOSTAFA/vehicle_system_api.git

✅ 2. Go Inside the Project Folder
cd vehicle_system_api

✅ 3. Install All Dependencies
npm install

✅ 4. Create a .env File

Create a new .env file in the project root:

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/vehicle_system
JWT_SECRET=YOUR_SECRET_KEY

✅ 5. Start Development Server
npm run dev

📦 6. Build the Project (for production)
npm run build

▶️ 7. Run Production Build
npm start