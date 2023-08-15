/* cd is change directory for hyper
mkdir for making folder
touch app.js index.html for making file
npm init is to initialize npm
npm install body-parser express request ... modules
node app.js to run it
*/
const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static(__dirname+"/"));    //to send css and image that are static and making a public folder and saving it there
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/6d4780077f";
    const options={
        method:"POST",
        auth:"mitansh:af1468685dd6eea7e38b2e3b7086f36df-us21",
    }

    const request = https.request(url,options,function(response){     //to send the data to API

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server running");
})

//API key: f1468685dd6eea7e38b2e3b7086f36df-us21
//List id: 6d4780077f