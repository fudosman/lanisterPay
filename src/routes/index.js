const express = require("express");
const router = express.Router();

router.get("/compute", require("../controllers/compute"));

module.exports = router;