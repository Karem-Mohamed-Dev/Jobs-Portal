const router = require("express").Router();

const { updateSeeker, deleteSeeker } = require('../controllers/seeker.js');
const { isAuth } = require("../utils/isAuth.js");

router.use(isAuth);

router.patch("/", updateSeeker);

router.delete("/", deleteSeeker);

module.exports = router;