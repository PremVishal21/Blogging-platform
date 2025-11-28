import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Admin(){
  const [stats, setStats] = useState(null);
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(!token) return;
    axios.get('/api/admin/stats', { headers: { Authorization: 'Bearer '+token }}).then(r=> setStats(r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Admin</h1>
      {stats ? <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Users: {stats.users}</div>
        <div className="p-4 bg-white rounded shadow">Posts: {stats.posts}</div>
      </div> : <div>Login as admin to see stats</div>}
    </div>
  )
}
