const express = require("express");
const router = express.Router();

const compute = require("../controllers/compute");

router.get("/compute", compute);

module.exports = router;