const router = require("express").Router();

const { seekerLogin, seekerRegister, companyLogin, companyRegister } = require('../controllers/auth');

router.post("/seeker/login", seekerLogin);

router.post("/seeker/register", seekerRegister);

router.post("/company/login", companyLogin);

router.post("/company/register", companyRegister);

module.exports = router;