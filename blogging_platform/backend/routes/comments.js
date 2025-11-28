const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

router.post('/:postId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = new Comment({ post: req.params.postId, author: req.user._id, content });
    await comment.save();
    res.json(comment);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author','name avatar').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }) }
});

module.exports = router;
