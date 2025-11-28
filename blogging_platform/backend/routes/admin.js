const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

// admin only: list users & posts
router.get('/stats', auth, async (req, res) => {
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const users = await User.countDocuments();
  const posts = await Post.countDocuments();
  res.json({ users, posts });
});

module.exports = router;
