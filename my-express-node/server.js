//jshint esversion:6

const express = require("express");
const app = express();

app.get("/",function(request,response){
    response.send("<h1>hello</h1>");
})

app.get("/contact", function(req,res){
    res.send("contact at mit@123");
})

app.listen(3000, function(){
    console.log("Server started");
});