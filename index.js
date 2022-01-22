const express = require("express")
const app = express()
const user = require("./routes/user")
app.use(express.json())
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/backend")
        .then(() => console.log("connected to database successfully"))

const port = process.env.PORT || 4000

app.use('/api/users', user)

const server = app.listen(port, () => console.log(`App listening on port ${port}...`))

module.exports = server;