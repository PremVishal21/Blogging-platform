import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home(){
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    axios.get('/api/posts').then(r=> setPosts(r.data.posts)).catch(console.error);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map(p=> (
          <article key={p._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            {p.coverImage && <img src={p.coverImage} alt="" className="w-full h-40 object-cover rounded mb-3"/>}
            <h2 className="text-xl font-semibold"><Link to={'/post/'+p._id}>{p.title}</Link></h2>
            <p className="text-sm text-gray-600">By {p.author?.name}</p>
            <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{__html: p.excerpt}} />
          </article>
        ))}
      </div>
    </div>
  )
}
