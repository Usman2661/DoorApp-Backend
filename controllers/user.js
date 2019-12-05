const Users = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
        const token = jwt.sign({email: fetcheduser.email , userId: fetcheduser._id},
            'WinterIsComingGOT2019' ,
            {expiresIn: '1h'}
         );

        res.status(200).json({
            message:"Success",
            token:token,
            userId: fetcheduser._id,
            email:fetcheduser.email,
            usertype:fetcheduser.usertype,
            name:fetcheduser.name
          });
    })
    .catch(err  => {
        return res.status(401).json({
            message: "Invalid Authentication Credentials!"
          });
    })
 
}

exports.getSingleUser = (req,res, next) => {

    const id = req.query.id;
    Users.findById(id)
    .then( users => {
        res.status(200).json({
            users:users
          });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
          });
    })

}


exports.updateUser = (req,res, next) => {

    const file = req.file;
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;

    const location = "http://localhost:3000/uploads/"+file.filename;

    Users.updateOne({'_id': id },
    {$set :{"name":name , "email":email, 'image':location}})
    .then(user => {
        res.status(200).json({
                    user:user
            });
    })
     .catch(err=>{
        res.status(500).json({
            error:err
          });
    })
}

exports.totalUsers = (req,res, next) => {

    Users.count()
    .then(count => {
        res.status(200).json({
                    users:count
            });
    })
     .catch(err=>{
        res.status(500).json({
            error:err
          });
    })
}