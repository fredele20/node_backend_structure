const express = require("express")
const user = require("../routes/user")
const errors = require("../middleware/errors")


module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", user)

  app.use(errors)
}