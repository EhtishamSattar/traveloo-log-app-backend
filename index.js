const express = require("express")
const app = express()
const connectDB = require("./db");
var cors = require('cors')
require('dotenv').config();  // to obtain data from .env file


//Connecting the Database
connectDB();
app.use(cors());

app.use(express.json());

// listening to port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})


app.use('/api/auth', require("./Routes/auth"));
