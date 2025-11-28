import React, { useState } from 'react';
import dynamic from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReactQuill = dynamic(()=> import('react-quill'), { ssr: false });

export default function CreatePost(){
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [tags,setTags]=useState('');
  const navigate = useNavigate();

  const submit = async () => {
    const token = localStorage.getItem('token');
    if(!token) return alert('Login to create');
    try{
      const res = await axios.post('/api/posts', { title, content, tags: tags.split(',').map(t=>t.trim()) }, { headers: { Authorization: 'Bearer '+token }});
      navigate('/post/'+res.data._id);
    }catch(e){ console.error(e); alert('Error') }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Create Post</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-3 border rounded" />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags comma separated" className="w-full p-2 mt-3 border rounded" />
      <div className="mt-3">
        <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Publish</button>
      </div>
    </div>
  )
}
