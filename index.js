const express = require("express")
const app = express()
const connectDB = require("./db");

//Connecting the Database
connectDB();

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
