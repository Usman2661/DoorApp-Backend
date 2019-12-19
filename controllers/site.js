Sites = require('../models/site');
Doors = require('../models/door');


exports.createSite = (req,res,next ) => {

    const site = new Sites({
        SiteName: req.body.SiteName,
        SiteAddressLine1:req.body.SiteAddressLine1,
        SiteAddressLine2:req.body.SiteAddressLine2,
        PostCode:req.body.PostCode,
        City:req.body.City,
        Image: "http://localhost:3000/uploads/" + req.file.filename
    });
    
    site.save()
    .then(result => {
        res.status(201).json({
            message: 'Site Created!', 
            result: result
      });
    })
    .catch (error =>{
        res.status(500).json({
            error: error
      });
    })
}
exports.getSites = (req,res,next) => {
    Sites.find()
    .then(site =>{
        res.status(200).json({
            sites: site
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}

exports.totalSites = (req,res, next) => {
    Sites.count()
    .then(count => {
        res.status(200).json({
                    sites:count
            });
    })
     .catch(err=>{
        res.status(500).json({
            error:err
          });
    })
}

exports.getSiteDoors = (req,res,next) => {
 
    const id = req.query.id;
    Doors.find({SiteID:id})
    .then(Doors =>{
        res.status(200).json({
            Doors: Doors
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}

exports.getSite = (req,res,next) => {
 
    const id = req.query.id;
    Sites.findById(id)
    .then(Sites =>{
        res.status(200).json({
            Site: Sites
      });
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}

exports.updateSite = (req,res,next) => {
 

    if (req.file){
        const id = req.body.id;
        const SiteName = req.body.SiteName ;
        const SiteAddressLine1 = req.body.SiteAddressLine1;
        const SiteAddressLine2 = req.body.SiteAddressLine2;
        const City = req.body.City;
        const PostCode = req.body.PostCode;   
        const Image = "http://localhost:3000/uploads/" + req.file.filename

        Sites.updateOne({'_id': id },
        {$set :{"SiteName":SiteName , "SiteAddressLine1":SiteAddressLine1, 'SiteAddressLine2':SiteAddressLine2,'City':City,'PostCode':PostCode,"Image":Image}})
        .then(site => {
            res.status(200).json({
                        site:site
                });
        })
         .catch(err => {
            res.status(500).json({
                error:err
              });
        })
    }
    else{
        const id = req.body.id;
        const SiteName = req.body.SiteName ;
        const SiteAddressLine1 = req.body.SiteAddressLine1;
        const SiteAddressLine2 = req.body.SiteAddressLine2;
        const City = req.body.City;
        const PostCode = req.body.PostCode;    
        
        Sites.updateOne({'_id': id },
        {$set :{"SiteName":SiteName , "SiteAddressLine1":SiteAddressLine1, 'SiteAddressLine2':SiteAddressLine2,'City':City,'PostCode':PostCode}})
        .then(site => {
            res.status(200).json({
                        site:site
                });
        })
         .catch(err => {
            res.status(500).json({
                error:err
              });
        })
    }
   
}

exports.getSiteWithMostDoors = (req,res,next) => {

    Doors.aggregate([
        {
            $group: {
                _id: '$SiteID',
                count: {$sum: 1}
            },   
           },
           {
            $sort : {count : -1}
           },
           { 
               $limit: 1 
           }
     ])
     .then(site => {
        res.status(200).json({
                    site:site
            });
    })
     .catch(err => {
        res.status(500).json({
            error:err
          });
    })
     
}

exports.deleteSite = (req,res,next) => {
    
    id = req.body.id;
    Sites.deleteOne({_id:id})
    .then(site =>{
        Doors.deleteMany({SiteID:id})
        .then(sitedoor => {
            res.status(200).json({
                sitedoor: sitedoor
          });
        })
        .catch(error => {
            res.status(500).json({
                error: error
          });
        })
    })
    .catch(error=> {
        res.status(500).json({
            error: error
      });
    })
}

