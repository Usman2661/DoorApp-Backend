const fs = require('fs');
const AWS = require('aws-sdk');
DoorDocument = require("../models/doorDocuments");

exports.deletefile = (req,res,next) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey:  process.env.secretAccessKey
    });

    const deleteFile = () => {

        const id = req.body.id;
        const docpath = req.body.docpath;
        var params = {
            Bucket: 'door-app-documents',
            Key: docpath
          };
          s3.headObject(params, function (err, data) {  
            if (err && err.code === 'NotFound') {  

                res.status(200).json({
                message: 'File not found!',
                data:data
                });   
              
            } else {  
          s3.deleteObject(params, function(err, data) {
            if (err)
            {
                res.status(500).json({
                    error:err
              });     
            } 
            if(data){

                DoorDocument.deleteOne({_id:id})
                .then(door =>{
                    res.status(200).json({
                        message: 'File Deleted!!!',
                        doors: door
                  });
                })
                .catch(error=> {
                    res.status(500).json({
                        error: error
                  });
                })
                
            }     
          });
            }
          });
      
    };
    deleteFile();

}