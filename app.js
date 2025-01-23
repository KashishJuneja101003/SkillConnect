const express = require("express");
const mongoose = require("mongoose");
const Mentee = require("./models/mentee.js");
const Mentor = require("./models/mentor.js");
const Course = require("./models/course.js");
const ejsMate = require("ejs-mate");
const path = require("path");

const methodOverride = require("method-override");

const port = 8080;

// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
// Middleware to parse request bodies
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SkillConnect");
}

main()
  .then((res) => {
    console.log("Connection to mongoDb successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// Home route
app.get("/", (req, res) => {
  res.render("listings/index.ejs");
});

// mentee registration
app.get("/mentee_regis", (req, res) => {
  res.render("listings/mentee.ejs");
});

app.post("/mentee_regis/add", async (req, res) => {
  let {
    name,
    email,
    phone,
    linkedin,
    institute,
    degree,
    interests,
    whyWantMentor,
    shortTermLearningGoals,
    longTermCareerAspirations,
    additionalInfo,
  } = req.body;

  let newData = new Mentee({
    name,
    email,
    phone,
    linkedin,
    institute,
    degree,
    interests,
    whyWantMentor,
    shortTermLearningGoals,
    longTermCareerAspirations,
    additionalInfo,
  });

  await newData.save();

  console.log("New Mentee has been registered");
  res.redirect("/");
});

// mentor registration
app.get("/mentor_regis", (req, res) => {
  res.render("listings/mentor.ejs");
});
app.post("/mentor_regis/add", async (req, res) => {
  let {
    name,
    email,
    phone,
    linkedin,
    github,
    company,
    position,
    skills,
    experience,
    mentorshipArea,
    additionalInfo,
  } = req.body;

  // Create a new Mentor document
  let newMentor = new Mentor({
    name,
    email,
    phone,
    linkedin,
    github,
    company,
    position,
    skills,
    experience,
    mentorshipArea,
    additionalInfo,
  });

  try {
    // Save the new Mentee to the database
    await newMentor.save();
    console.log("New Mentor has been registered");

    // Redirect or send a success response
    res.redirect("/ShowMentors"); // Or send a response message
  } catch (err) {
    console.error("Error saving mentor:", err);
    res.status(500).send("There was an error with the registration.");
  }
});

// show all mentors
app.get("/ShowMentors", async (req, res) => {
  let allMentor = await Mentor.find({});

  res.render("listings/showMentors.ejs", { allMentor });
});

// show all courses
app.get("/courses", async (req, res) => {
  let courses = await Course.find({});

  res.render("listings/courses.ejs", { courses });
});

// add new course
app.get("/newCourse", (req, res) => {
  res.render("listings/addNewCourse.ejs");
});

app.post("/newCourseAdd", async (req, res) => {
  const { courseName, description, image, mentorName, date, time } = req.body;

  // Create a new course object
  const newCourse = new Course({
    courseName,
    description,
    image,
    mentorName,
    date,
    time,
  });

  try {
    // Save the course to MongoDB
    await newCourse.save();
    res.redirect("/courses");
  } catch (err) {
    res.status(500).send("Error saving course: " + err.message);
  }
});

app.get("/mentorProfile/:id", async (req, res) => {
  let { id } = req.params;
  let mentor = await Mentor.findById(id);
  res.render("listings/mentorProfile.ejs", { mentor });
});

app.get("/deleteMentor/:id", async (req, res) => {
  let { id } = req.params;
  await Mentor.findByIdAndDelete(id);
  res.redirect("/ShowMentors");
});

app.get("/updateMentorProfile/:id" ,async (req,res)=>{

  let {id} = req.params ;
  let mentor = await Mentor.findById(id) ;
    res.render("listings/updateMentorProfile.ejs" , {mentor}) ;
});

app.get("/cancelUpdate",(req,res)=>{
  res.redirect("/ShowMentors");
})

app.put("/updateMentorProfile/:id" , async (req,res)=>{
  let {id} = req.params ;

  let { name, email, phone, linkedin, skills, experience, mentorshipArea } = req.body;

  let mentor = await Mentor.findByIdAndUpdate(id,{ name, email, phone, linkedin, skills, experience, mentorshipArea },
    { new: true }  // Return the updated document

  ) ;
  res.render("listings/mentorProfile.ejs", { mentor });
})