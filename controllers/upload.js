const fs = require('fs');
const AWS = require('aws-sdk');
DoorDocument = require("../models/doorDocuments");

exports.uploadFile = (req,res,next) => {

    console.log(req.body);
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
            if (data){

                fs.unlink(myfile, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                }); 

                const locationUrl = data.Location;
                let newDoorDocument = new DoorDocument({ ...req.body, Document: locationUrl });
                newDoorDocument.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'Document Added!', 
                            result: result
                      });
                    })
                    .catch(error => {
                        res.status(500).json({
                            error:error
                      });
                    })

            }
         });
     
      });
    };

    uploadFile();

}