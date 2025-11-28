📊 Blogging Platform – MERN Stack

A full‑featured blogging web application built using the MERN stack, offering secure authentication, rich blog creation tools, user interaction features, and admin-level management functionalities.

🚀 Features

🔐 User Authentication with JWT

📝 Create/Edit/Delete Blogs with rich text editor

💬 Comments & Likes interaction

👤 User Profile displaying authored posts

🔍 Search & Filter blogs by categories

🧑‍💼 Admin Dashboard for complete management

☁️ Cloudinary image uploads

📱 Fully responsive UI with Tailwind CSS

📂 Project Structure
root/
│── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── utils/
│
│── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
│── README.md
│── package.json
🛠️ Installation & Setup
1. Clone the repository:
git clone <repo-url>
2. Install dependencies:
Client:
cd client
npm install
Server:
cd server
npm install
3. Environment Variables:

Create a .env file inside server folder with:

MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
4. Run the project:
Start backend:
npm run server
Start frontend:
npm start
📤 Deployment

Frontend → Netlify / Vercel

Backend → Render / Railway

Image Hosting → Cloudinary

🤝 Contributions

Contributions are welcome! Feel free to submit issues or pull requests.

👨‍💻 Author

Developed by Prem, as a scalable MERN project for blogging and content management.
