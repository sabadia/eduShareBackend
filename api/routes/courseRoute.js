const router = require('express').Router();
const courseControlers = require('../controllers/courseControllers');
router.get('/courses', courseControlers.getAllCoursesFromDB);
router.post('/courses', courseControlers.saveCourseToDB);
router.delete('/courses/:id', courseControlers.deleteCourseFromDB);

module.exports = router;
