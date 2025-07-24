const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db.js")
connectDB();


// build express application
const express = require("express");
const app = express();


// Global middlware
/***enable CORS for CROSS ORIGIN requests ***/
app.use(cors());
// convert JSON formate to request.body
app.use(express.json());


// run the server
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});