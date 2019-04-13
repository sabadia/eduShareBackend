const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
  courseName: { type: String, requireed: true },
  courseDetails: String,
  lecture: [
    {
      lectureName: { type: String, default: 'demo lecture' },
      lectureBody: { type: String, default: 'demo lecture body' }
    }
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Course', courseSchema);
