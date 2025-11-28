# Blogging Platform (Frontend + Backend)

## Overview
This repository contains a full-stack blogging platform scaffold using the requested tech stack:
- Frontend: React + Redux Toolkit + Tailwind CSS + React Quill (rich text editor)
- Backend: Node.js + Express + MongoDB (Mongoose) + JWT auth

## Setup

### Backend
1. `cd backend`
2. copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. The frontend expects the backend to be reachable under the same host at `/api/*`. If using different hosts, configure a proxy or adjust axios base URLs.

## Notes
- Add file upload handling and Cloudinary integration in backend if you need image uploads.
- Tailwind is already configured.
- This scaffold focuses on clarity and core features: auth, posts CRUD, comments, likes, admin stats, search/tag filtering.
