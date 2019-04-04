const Course = require('../models/courseModel');

const getAllCoursesFromDB = (req, res, next) => {
  Course.find()
    .then(courses => {
      console.log(courses[0].lecture);
      res.status(200).json({
        message: 'courses get sucessfully',
        courses
      });
    })
    .catch(err => console.log(err));
};
const saveCourseToDB = (req, res, next) => {
  const course = new Course(req.body);
  course.save().then(result => {
    res.status(201).json({
      message: 'post added sucessfully',
      courseId: result._id
    });
  });
};

const deleteCourseFromDB = (req, res, next) => {
  Course.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'post deleted' });
  });
};

module.exports = {
  getAllCoursesFromDB,
  saveCourseToDB,
  deleteCourseFromDB
};
