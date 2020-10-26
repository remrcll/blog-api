const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

router.route('/').get(getAllPosts).post(addPost);

router
  .route('/:id')
  .get(getPost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = router;