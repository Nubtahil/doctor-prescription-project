const express = require("express")
const router = express.Router()
const Patient = require("../Model/PatientSchema")
const {body} = require("express-validator")
const{searchSinglePatient,allPatients,addPatientInfo,updatePatientInfo,deletePatientInfo} = require("../Controller/PatientController")
const Uploads = require("../multer.js")




router.get("/get/:id", searchSinglePatient)


router.get("/get", allPatients)

router.post("/add",
    Uploads.single("image"),
  [ 
    // express_validation start from here.
    body("name").notEmpty().isLength({max:30}).withMessage("Name is required"),
    body("age").isNumeric().notEmpty().withMessage("Age is required"),
    body("disease").notEmpty().withMessage("Diseaseis required"),
    body("duration").notEmpty().withMessage("Duration is required"),
    body("phoneNumber").notEmpty().isNumeric().isLength({max:11,min:11}).withMessage("Phone Number must be 11 digits"),
    body("gender").notEmpty().withMessage("Gender is required"),
    
 ],addPatientInfo)

router.put("/update/:id",Uploads.single("image"), updatePatientInfo)


router.delete("/delete/:id", deletePatientInfo)

module.exports = router