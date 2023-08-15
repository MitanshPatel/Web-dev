const express=require("express");
const https=require("https");   //to access the weather API
const bodyParser=require("body-parser"); //to access what the user typed in html form
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){  // form action in html to send the html code
 res.sendFile(__dirname+"/index.html");
})


app.post("/", function(req,res){  //form method post in html 
   
    const query=req.body.cityName;  //input name ciyName used in html
    const apikey="276c8a56b0360c9e5f2381c91c1ad975";
    const metric="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+metric+""
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherDescription=weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const img = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>Weather is: "+weatherDescription+"</p>");
            res.write("<h1>The temp in "+query+" is: "+temp+"</h1>");  //there can onlye be one res.send in the function of app, so use res.write for display of multiple data  and at end write res.send
            res.write("<img src="+img+">");
            res.send();
        })
    });

})



app.listen(3000,function(){
    console.log("Server running");
})