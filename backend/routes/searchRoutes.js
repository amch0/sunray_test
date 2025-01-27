const express = require("express");
const {
  sortNumbers,
  getFrequentNumbers,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/sort", sortNumbers);
router.get("/frequent/:n", getFrequentNumbers);

module.exports = router;
