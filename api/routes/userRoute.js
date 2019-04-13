const router = require('express').Router();
const userControlers = require('../controllers/userControllers');
router.post('/signup', userControlers.addUserToDB);
router.post('/login', userControlers.login);

module.exports = router;
