const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("<> yep");

  res.send("Hello World");
});

router.post("/:emailID", (req, res) => {
  const emailID = req.params.emailID;

  if (emailID === "dsgaia") {
    res.send(emailID);
  }
});

module.exports = router;
