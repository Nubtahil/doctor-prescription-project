const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv");
const Patient = require("./Model/PatientSchema")
const router = require("./Routes/PateintRoutes")
dotenv.config();


// middlewares

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));//Uploads folder ki files (images/docs) browser me access karne ke liye use hoti hai.
app.use(express.urlencoded({ extended: true }));//HTML form ka data req.body me receive karne ke liye use hoti hai.

//connection
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Database connected successfully!"))
.catch(error=> console.log(error))

// routes

app.use("/patient", router)
 
//listen to port
app.listen(5000, ()=> {
    console.log("Server running on port 5000")
})