const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Full Name is required
  },
  email: {
    type: String,
    required: true,  // Email is required
    unique: true,    // Ensures the email is unique in the database
    match: [/.+\@.+\..+/, 'Please provide a valid email address'], // Regex for email validation
  },
  phone: {
    type: String,
    required: true,  // Phone number is required
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'], // E.164 format for phone number
  },
  linkedin: {
    type: String,
    match: [/^https?:\/\/(?:www\.)?linkedin\.com\/.*$/, 'Please provide a valid LinkedIn URL'], // Validate LinkedIn URL format
  },
  github: {
    type: String,
    match: [/^https?:\/\/(?:www\.)?github\.com\/.*$/, 'Please provide a valid GitHub URL'], // Validate GitHub URL format
  },
  company: {
    type: String,
    required: true,  // Company is required
  },
  position: {
    type: String,
    required: true,  // Position is required
  },
  skills: {
    type: String,
    required: true,  // Skills are required
  },
  experience: {
    type: Number,
    required: true,  // Experience in mentoring is required
    min: [0, 'Experience cannot be negative'], // Experience cannot be less than 0
  },
  mentorshipArea: {
    type: String,
    required: true,  // Areas the mentor can provide mentorship in are required
  },
  additionalInfo: {
    type: String,
    trim: true, // Removes leading and trailing spaces
    maxlength: [1000, 'Additional information cannot exceed 1000 characters'], // Limit the length
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
