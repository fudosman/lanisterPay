const express = require("express");
const router = express.Router();

router.post("/compute", require("../controllers/compute"));

module.exports = router;