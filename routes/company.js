const router = require("express").Router();

const { getCompanyDetails, updateCompany, deleteCompany, getJob, addJob, editJob, deleteJob } = require('../controllers/company.js');
const { isAuth } = require("../utils/isAuth.js");

router.get("/:companyId", getCompanyDetails);

router.use(isAuth);

router.patch("/", updateCompany);

router.delete("/", deleteCompany);

router.get('/job/:jobId', getJob);

router.post('/job', addJob)

router.patch('/job/:jobId', editJob)

router.delete('/job/:jobId', deleteJob)

module.exports = router;