Sites = require('../models/site');

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