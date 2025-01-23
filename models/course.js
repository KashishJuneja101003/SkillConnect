const mongoose = require('mongoose');

// Define the schema for the Course
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL or path to the image
    required: true
  },
  mentorName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Can be a string like '2:00 PM'
    required: true
  }
}, { timestamps: true });

// Create the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
