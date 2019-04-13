const router = require('express').Router();
const courseControlers = require('../controllers/courseControllers');
const checkUser = require('../middleware/check-user');

router.delete('/:id', checkUser, courseControlers.deleteCourseFromDB);
router.get('/:id', courseControlers.getCourseDetailsFromDB);
router.put('/:id', checkUser, courseControlers.updateCourseToDB);
router.get('', courseControlers.getAllCoursesFromDB);
router.post('', checkUser, courseControlers.saveCourseToDB);
module.exports = router;
