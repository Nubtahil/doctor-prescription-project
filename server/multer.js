const multer = require("multer")
const storage = multer.diskStorage ( {

    
    destination:function(req,file,cb){
  cb(null,"./Uploads")
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now() + file.originalname
        cb(null,fileName)
    }
})
const fileFilter = (req, file, cb) =>{
 if(file.mimetype.startsWith("image/")){
    cb(null,true)
} else {
     cb(new Error("Only image files are allowed!"), false)
}
}


const Uploads = multer({storage,
fileFilter,

})
module.exports= Uploads