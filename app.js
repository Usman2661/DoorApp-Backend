const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const userRoutes = require ("./routes/user");
const siteRoutes = require ("./routes/site");
const doorRoutes = require ("./routes/door");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dooruser:pakistan2546@doormaintainance-z2i7d.mongodb.net/test?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to the database!!!');
})
.catch((error)=>{
  console.log('Connection Failed!!!');
  console.log(error);
});

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin , X-Requested-With, Content-Type, Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET , POST , PUT , PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/user", userRoutes );
app.use("/api", siteRoutes );
app.use("/api", doorRoutes );

module.exports = app;
