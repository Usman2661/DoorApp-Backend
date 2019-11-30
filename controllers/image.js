exports.image = (req,res,next) => { 
        
  const file = req.file;

  console.log(file.filename);

  res.status(200).json({
    message:"File Upload Success",
    location: "http://localhost:3000/uploads/"+file.filename
  });
}