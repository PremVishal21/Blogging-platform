import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    try{
      const res = await axios.post('/api/auth/login', { email, password });
      dispatch(setAuth(res.data));
      navigate('/');
    }catch(e){ alert('Login failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border rounded" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 mb-2 border rounded" />
      <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
    </div>
  )
}
