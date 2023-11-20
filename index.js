const express = require("express")
const app = express()
const connectDb = require("./db");
var cors = require('cors')
require('dotenv').config();  // to obtain data from .env file


//Connecting the Database
connectDb();

app.use(cors());

app.use(express.json());

// listening to port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
app.use('/api/auth', require("./Routes/auth"));
app.use('/api/post', require("./Routes/post"));

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})


module.exports = app;