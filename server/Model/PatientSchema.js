const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
name:{
   type:String,
   required: true
 },
 age:{
  type:String,
  required: true
 },
 disease:{
  type:String,
  required: true
 },
 duration:{
  type:String,
  required: true
 },
 gender:{
  type:String,
  enum:["male","female"],
  required: true
 },
//  medicine:{
//    name: String,
//    dosage: String,
//    notes: String
//  },
 phoneNumber:{
  type:String,
  required: true
 },
 createdAt:{
  type:Date,
  default:Date.now
 }
 ,
 image:{
  type:String
 }
})

module.exports = mongoose.model("Patient",PatientSchema)


// "Patient" is collection name 
//or wo collection kesi dhkti ho gi us ko "PatientSchema"