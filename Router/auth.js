const express = require("express");
const { default: mongoose } = require("mongoose");
const route = express.Router();
const USER = mongoose.model("myintern");
const jwt = require("jsonwebtoken");
const { seckey } = require("../db");

route.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ error: "User Not Found" });
  }
  USER.findOne({ email }).then((result) => {
    if (result) {
      res.status(400).json({ error: "Bad Request User Already Present" });
    } else {
      const temp = new USER({
        email,
        password,
      });
      temp.save().then((data) => {
        res.status(201).json({ message: "Successfully Data Added" });
      });
    }
  });
});



route.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ error: "User Not Found" });
  }
  USER.findOne({ email }).then((result) => {
    if (!result) {
      return res.status(400).json({ error: "Email id is wrong" });
    }

    USER.findOne({ password }).then((data) => {
      if (!data) {
        return res.status(400).json({ error: "Password is wrong" });
      } else {
        const token = jwt.sign({ _id: result._id}, seckey);
        res.status(200).json({ token, message: "Successfully Login In" });
      }
    });
  });
});

module.exports = route;
