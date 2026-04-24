const express = require('express');
const router = express.Router();
const {
  createReview,
  addAdminComment,
  deleteReview,
} = require('../controllers/reviewsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Routes for reviews
router.post('/', protect, createReview);
router.put('/:id/admin-comment', protect, admin, addAdminComment);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;