//used POSTMAN, no frontend

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB", {useNewUrlParser: true});   //   ... to host locally

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


//////////Request targetting all articles//////////////////
app.route("/articles")
.get(function(req, res){
    
    Article.find({})
    .then(function(foundArticles){
        res.send(foundArticles);
    })
    .catch(function(err){
        console.log(err);
    })
})
.post(function(req,res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().then(function(){
        console.log("done");
    })
    .catch(function(err){
        console.log(err);
    })
})
.delete(function(req,res){
    Article.deleteMany({})
    .then(function(){
        res.send("Successfully deleted");
    })
    .catch(function(err){
        console.log(err);
    })
});


//////////Request targetting particular article//////////////////
app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title: req.params.articleTitle})    //if to access Jack Bauer, it shoudl be /Jack%20Bauer
    .then(function(foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("No article found");
        }
    })
    .catch(function(err){
        console.log(err);
    })
})
.put(function(req,res){
    Article.replaceOne(
        {title: req.params.articleTitle}, 
        {title: req.body.title,content: req.body.content},
        {overwrite: true}
    )                                 //({condition}, {update})
    .then(function(){
        res.send("Successfully changed")
    })
    .catch(function(err){
        console.log(err);
    })
})
.patch(function(req,res){
    Article.updateOne(
        {title: req.params.articleTitle}, 
        {$set: req.body}
    )
    .then(function(){
        res.send("Successfully updated")
    })
    .catch(function(err){
        console.log(err);
    })
})
.delete(function(req,res){
    Article.deleteOne({title: req.params.articleTitle})
    .then(function(){
        res.send("deleted")
    })
    .catch(function(err){
        console.log(err)
    })
});

app.listen(3000,function(){
    console.log(`server running on port 3000`);
});