const Review = require('../models/reviewsModel');
const asyncHandler = require('express-async-handler');

// Create a new review
const createReview = asyncHandler(async (req, res) => {
  const { recipe, rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    recipe,
    rating,
    comment,
  });

  if (review) {
    res.status(201).json(review);
  } else {
    res.status(400);
    throw new Error('Invalid review data');
  }
});

// Admin: Add a comment to a review
const addAdminComment = asyncHandler(async (req, res) => {
  const { adminComment } = req.body;
  const review = await Review.findById(req.params.id);

  if (review) {
    review.adminComment = adminComment;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

// Admin: Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    await review.remove();
    res.json({ message: 'Review removed' });
  } else {
    res.status(404);
    throw new Error('Review not found');
  }
});

module.exports = { createReview, addAdminComment, deleteReview };