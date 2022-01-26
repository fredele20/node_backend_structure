const express = require("express")
const app = express()

require("./startups/errLoggin")()
require("./startups/routes")(app)
require("./startups/db")()


const port = process.env.PORT || 4000
const server = app.listen(port, () => console.log(`App listening on port ${port}...`))

module.exports = server;