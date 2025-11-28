const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags, coverImage, published } = req.body;
    const excerpt = (content || '').replace(/<[^>]+>/g, '').slice(0, 200);
    const post = new Post({ title, content, excerpt, tags, coverImage, author: req.user._id, published });
    await post.save();
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

// edit post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }
    const { title, content, tags, coverImage, published } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = (content || post.content).replace(/<[^>]+>/g, '').slice(0,200);
    post.tags = tags || post.tags;
    post.coverImage = coverImage || post.coverImage;
    post.published = published ?? post.published;
    post.updatedAt = Date.now();
    await post.save();
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

// delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

// list posts with search and tag filter
router.get('/', async (req, res) => {
  try {
    const { q, tag, page=1, limit=10 } = req.query;
    const filter = { published: true };
    if(q) filter.$or = [{ title: new RegExp(q,'i') }, { content: new RegExp(q,'i') }];
    if(tag) filter.tags = tag;
    const posts = await Post.find(filter).populate('author','name avatar').sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
    const total = await Post.countDocuments(filter);
    res.json({ posts, total });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

// single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author','name avatar');
    if(!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

// like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Not found' });
    const idx = post.likes.findIndex(l => l.toString() === req.user._id.toString());
    if(idx === -1) post.likes.push(req.user._id);
    else post.likes.splice(idx,1);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

module.exports = router;
