const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");

const PostRoutes = require("./router/posts");
const UserRoutes = require("./router/user");

const app=express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://Harsh:" + process.env.MONGO_ATLAS_PSWD + "@cluster0.eqlde.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images", express.static(path.join("images")));
// app.use("/", express.static(path.join(__dirname , "Angular")));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin ,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});

app.use('/api/Posts', PostRoutes);
app.use('/api/User', UserRoutes);
// app.use((req ,res , next) =>{
//   res.sendFile(path.join(__dirname,"Angular","index.html"));
// });

module.exports = app;
