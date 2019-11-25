Sites = require('../models/site');

exports.createSite = (req,res,next ) => {

    const site = new Sites({
        SiteName: req.body.SiteName,
        SiteAddressLine1:req.body.SiteAddressLine1,
        SiteAddressLine2:req.body.SiteAddressLine2,
        PostCode:req.body.PostCode,
        City:req.body.City
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