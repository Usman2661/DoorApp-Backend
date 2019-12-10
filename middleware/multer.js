const multer  = require('multer');

const diskStorageToUploads = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+ file.originalname)        
    }
});

const saveToUploads = multer({storage: diskStorageToUploads });

module.exports = {
    //  try {
        saveToUploads: saveToUploads.single('file')
    //  }
    //  catch(error){
    //      console.log(error);
    //  }
}