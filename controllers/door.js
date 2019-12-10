Doors = require("../models/door");
Sites = require("../models/site");
DoorDocument = require("../models/doorDocuments");
const mongoose = require('mongoose');

exports.createDoor = (req,res,next) => {

    const door = new Doors({
        SiteID: req.body.SiteID,
        DoorName:req.body.DoorName,
        DoorLocation:req.body.DoorLocation,
        DateTimeCreated:req.body.DateTimeCreated,
        Image: "http://localhost:3000/uploads/" + req.file.filename
        });
        door.save()
        .then(result => {
            res.status(201).json({
                message: 'Door Created!', 
                result: result
          });
        })
        .catch(error => {
            res.status(500).json({
                error:error
          });
        })

}
exports.getDoors = (req,res,next) => {

    Doors.aggregate([
        { "$addFields": { "SitesID": { "$toObjectId": "$SiteID" }}},
        { "$lookup": {
          "from": "sites",
          "localField": "SitesID",
          "foreignField": "_id",
          "as": "Door_Site"
        }}
      ])
         .then(door =>{
            res.status(200).json({
            doors: door
          });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}
exports.deleteDoor = (req,res,next) => {

    id = req.body.id;
    Doors.deleteOne({_id:id})
    .then(door =>{
        res.status(200).json({
            doors: door
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}
exports.getDoor = (req,res,next) => {

    const id = req.query.id;
    Doors.findById(id)
    .then(door =>{
        res.status(200).json({
            door: door
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}
exports.uploadDoorFile = (req,res,next) => {
    
    const DoorDocument = new DoorDocument({
        DoorID: req.body.DoorID,
        DocumentTitle:req.body.DocumentTitle,
        Document:req.body.Document,
        DateTime:req.body.DateTime
        });

        DoorDocument.save()
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

exports.getDoorDocuments = (req,res,next) => {

    const id = req.query.id;
    DoorDocument.find({DoorID:id})
    .then(DoorDocuments =>{
        res.status(200).json({
            DoorDocuments: DoorDocuments
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}

exports.totalDoors = (req,res, next) => {
    Doors.count()
    .then(count => {
        res.status(200).json({
                    doors:count
            });
    })
     .catch(err=>{
        res.status(500).json({
            error:err
          });
    })
}

