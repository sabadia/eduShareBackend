const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
  courseName: { type: String, requireed: true },
  courseDetails: String,
  lecture: [
    {
      lectureName: { type: String, default: 'demo lecture' },
      lectureBody: { type: String, default: 'demo lecture body' }
    }
  ]
});

module.exports = mongoose.model('Course', courseSchema);
