const Course = require('../models/courseModel');

const getAllCoursesFromDB = (req, res, next) => {
  Course.find()
    .then(courses => {
      res.status(200).json({
        message: 'courses get sucessfully',
        courses
      });
    })
    .catch(err => console.log(err));
};
const getCourseDetailsFromDB = (req, res, next) => {
  Course.findById(req.params.id)
    .then(course => {
      if (course) {
        res.status(200).json({
          message: 'found',
          course
        });
      } else {
        res.status(401).json({
          message: 'not found'
        });
      }
    })
    .catch(err => console.log(err));
};

const saveCourseToDB = (req, res, next) => {
  const course = new Course(req.body);
  course.creator = req.userData.userId;
  course.save().then(result => {
    res.status(201).json({
      message: 'post added sucessfully',
      courseId: result._id,
      creator: result.creator
    });
  });
};

const deleteCourseFromDB = (req, res, next) => {
  Course.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'course  deleted' });
      } else {
        res.status(401).json({ message: 'not authorized' });
      }
    }
  );
};

const updateCourseToDB = (req, res, next) => {
  const courseModified = {
    _id: req.body.courseId,
    courseName: req.body.courseName,
    courseDetails: req.body.courseDetails,
    lecture: req.body.lecture,
    creator: req.body.creator
  };
  const course = new Course(courseModified);
  Course.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    course
  ).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'course  updated' });
    } else {
      res.status(401).json({ message: 'not authorized' });
    }
  });
};

module.exports = {
  getAllCoursesFromDB,
  saveCourseToDB,
  deleteCourseFromDB,
  getCourseDetailsFromDB,
  updateCourseToDB
};
