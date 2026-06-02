const Patient = require("../Model/PatientSchema.js")
const express = require("express")
const { validationResult } = require("express-validator")
const Uploads = require("../multer.js")
const fs = require("fs")
const path = require("path")

exports.searchSinglePatient = async(req,res)=>{
  try{
    const resultSinglePatient = await Patient.findById(req.params.id)
    res.json(resultSinglePatient)
  }
  catch(err){
    res.status(500).json(err)
  }
}

exports.allPatients = async(req,res)=>{
   try{
     const result = await Patient.find()
     res.json(result)
}
catch(err){
     res.status(500).json(err)
   }
}

exports.addPatientInfo =  async(req,res)=>{
 
 const errors = validationResult(req);
     //to check whether error is present or not
    if (!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
      });
       console.log(errors.array())
    }

     if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

    try{
      const data = {
      ...req.body,
       image: req.file.filename }
       
       const addPatientinfo = await Patient.create(data)
       res.json(addPatientinfo)
       console.log(req.body)
    
    }
    catch(err){
        res.status(500).json(err)
         console.log(err)
    }
}


exports.updatePatientInfo = async(req,res)=>{
try{
  //req.params.id konsa id se update karna hai
  //req.body  frontend se jo data aya h us ko update karna hai
  //that's y i am using both..(req.params.id,req.body)

 const updatedData =  {
 ...req.body,
 
 }
// agar new image ayi hai tabhi image update karo werna nae karo nae purani hi rehny do
 if(req.file){
  updatedData.image = req.file.filename
 }
  const updatePatientinfo = await Patient.findByIdAndUpdate(req.params.id,updatedData,{new:true})//new: true → update ke baad updated document return karo.
  res.json(updatePatientinfo)
  console.log(req.params.id);
  console.log(req.body);
  console.log(req.file);
  
}
catch(err){
  res.status(500).json(err)
  console.log(err)
}
}

exports.deletePatientInfo = async(req,res)=>{
 try{

// first find which patient image you want to delete from database 
// bring the id of that patient

const patient = await Patient.findById(req.params.id)
//__dirname kya hai?
//Current file ka folder.

if(patient.image){

const image_del_path = path.join(__dirname,"../uploads",patient.image)

//fs.existsSync(image_del_path) this check that whether that path exists if it
//fs.unlinkSync(image_del_path) then delete this
if(fs.existsSync(image_del_path)){
  fs.unlinkSync(image_del_path)
  console.log("image deleted: ",image_del_path)
}
}

const deletePatientinfo = await Patient.findByIdAndDelete(req.params.id)
 
res.json(deletePatientinfo)

console.log(patient.image);
console.log(image_del_path);
console.log(fs.existsSync(image_del_path));
}
 catch(err){
  res.status(500).json(err)
 console.log(err);
 }
}
 