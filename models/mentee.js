const mongoose = require("mongoose");

const schema = mongoose.Schema;

const menteeSchema = new schema({
  name: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  email: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        // Optional: You can add a regex to validate phone number format
        return /\+?[1-9]\d{1,14}$/.test(v); // E.164 phone number format
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  linkedin: String,
  institute: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  degree: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  interests: {
    type: [String], // Array of strings to store multiple interests
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensures that the interests array is not empty
      },
      message: "Please add at least one interest.",
    },
  },
  whyWantMentor: {
    type: String,
    required: true,
    trim: true, // Removes any leading or trailing spaces
    minlength: 10, // Minimum length for the answer (optional)
    maxlength: 500, // Maximum length for the answer (optional)
  },
  shortTermLearningGoals: {
    type: String,
    required: true,
    trim: true, // Removes any leading or trailing spaces
    minlength: 10, // Minimum length for the answer
    maxlength: 500, // Maximum length for the answer
  },
  longTermCareerAspirations: {
    type: String,
    required: true,
    trim: true, // Removes any leading or trailing spaces
    minlength: 10, // Minimum length for the answer
    maxlength: 1000, // Maximum length for the answer
  },
  additionalInfo: {
    type: String,
    required: false, // Optional field (can be changed to true if required)
    trim: true, // Removes any leading or trailing spaces
    maxlength: 1000, // Optional: Maximum length for the answer
  },
});


const Mentee = mongoose.model("Mentee", menteeSchema);

module.exports = Mentee;
