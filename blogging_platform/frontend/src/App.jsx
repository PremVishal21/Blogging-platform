import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

export default function App(){
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MyBlog</Link>
          <div className="space-x-3">
            <Link to="/create" className="px-3 py-1 rounded bg-indigo-600 text-white">Create</Link>
            <Link to="/admin" className="px-3 py-1 rounded border">Admin</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
    </div>
  )
}
