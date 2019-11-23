Users = require('../models/user');
var bcrypt = require('bcryptjs');

exports.createUser = (req,res,next) => {    
    var user = new Users();
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = hash;
        user.usertype = req.body.usertype;
    })
    user.save()
    .then(result => {
        res.status(201).json({
            message: 'User Created!', 
            result: result
      });
    })
    .catch(error => {
        res.status(500).json({
            message: error
      });
    })
}



exports.getUser = (req,res,next) => {
    email = req.body.email;
    password = req.body.password;

    let fetcheduser;
    Users.findOne({email:email})
    .then(user => {
        if (!user){
            return res.status(401).json({
                message: 'Invalid Credentials',
          });
        }
        else {
            fetcheduser = user;
            return bcrypt.compare(req.body.password, user.password);
        }
    })
    .then(result => {
        if (!result){
            return res.status(401).json({
                message: 'Invalid Credentials',
          });
        }
        res.status(200).json({
            message:"Success",
            userId: fetcheduser._id,
            email:fetcheduser.email
          });
    })
    .catch(err  => {
        return res.status(401).json({
            message: "Invalid Authentication Credentials!"
          });
    })
 
}