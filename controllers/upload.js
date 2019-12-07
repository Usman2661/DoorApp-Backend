const fs = require('fs');
const AWS = require('aws-sdk');

exports.uploadFile = (req,res,next) => {

    console.log(req.files.document.path);


    const s3 = new AWS.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey:  process.env.secretAccessKey
    });

    const fileName = req.files.document.path;    
    const myfile =  fileName.replace('..\\DoorApp-Backend\\','');

    const datetime = Date.now();

    const uploadFile = () => {
      fs.readFile(myfile, (err, data) => {
         if (err) {
            res.status(500).json({
                error: err 
            });

         }
            const params = {
                Bucket: 'door-app-documents', // pass your bucket name
                Key: `Documents/${datetime}-${myfile}`, // file will be saved as testBucket/contacts.csv
                ACL:'public-read',
                Body: data
         };
         s3.upload(params, function(s3Err, data) {
             if (s3Err){
                res.status(500).json({
                    error: s3Err 
                });
             }
             else{

                fs.unlink(myfile, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                }); 

                res.status(201).json({
                    message: 'File Uploaded!', 
                    data: data,
                    location:data.Location
                });
             }

            //  console.log(`File uploaded successfully at ${data.Location}`)
         });
      });
    };

    uploadFile();

}