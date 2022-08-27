const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/pg")
  .then(() => {
    console.log("mongodb connected....");
  })
  .catch((e) => {
    console.log("could not connect mongo db ", e);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  price: [Number],
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Zoo Course",
    author: "Mosh",
    tags: ["node", "backend"],
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course
    // .find({ author: /^Mosh/ })
    // .find({ author: /Hamedani*/ })
    .find({ name: /.*CO.*/i })
    //.and([{ author: "Pappu" }, { name: "A Course" }])
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 });
  console.log(courses);
}

getCourses();
//createCourse();
