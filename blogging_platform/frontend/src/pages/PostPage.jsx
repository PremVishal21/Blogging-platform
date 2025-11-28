import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PostPage(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(()=> {
    axios.get('/api/posts/'+id).then(r=> setPost(r.data)).catch(console.error);
    axios.get('/api/comments/'+id).then(r=> setComments(r.data)).catch(()=>{});
  },[id]);

  const submitComment = async () => {
    const token = localStorage.getItem('token');
    if(!token) return alert('Login to comment');
    try{
      await axios.post('/api/comments/'+id, { content: comment }, { headers: { Authorization: 'Bearer '+token }});
      setComment('');
      const res = await axios.get('/api/comments/'+id);
      setComments(res.data);
    }catch(e){ console.error(e); alert('Error') }
  }

  if(!post) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">By {post.author?.name}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: post.content}} />
      <section>
        <h3 className="font-semibold">Comments</h3>
        <div className="space-y-3">
          {comments.map(c=> (
            <div key={c._id} className="bg-white p-3 rounded shadow">
              <p className="text-sm font-medium">{c.author?.name}</p>
              <p className="text-gray-700">{c.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <textarea value={comment} onChange={e=>setComment(e.target.value)} className="w-full p-2 border rounded" rows={3} />
          <button onClick={submitComment} className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded">Comment</button>
        </div>
      </section>
    </div>
  )
}
