const router = require("express").Router();

const { getAllJobs, getJob, jobSearch } = require('../controllers/job.js');

router.get('/search', jobSearch)

router.get('/single/:jobId', getJob)

router.get('/', getAllJobs)

module.exports = router;