Doors = require("../models/door");

exports.createDoor = (req,res,next) => {

    const door = new Doors({
        SiteID: req.body.SiteID,
        DoorName:req.body.DoorName,
        DoorLocation:req.body.DoorLocation,
        DateTimeCreated:req.body.DateTimeCreated
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

    Doors.find()
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

