var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/restblog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(methodOverride("_method"));
var blogschema = new mongoose.Schema({
	title: String,
	img: String,
	body:String,
	created: {type:Date,default:Date.now }
});
var Blog = mongoose.model("Blog",blogschema);
// Blog.create({
// 	title:"First Blog",
// 	img:"https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
// 	body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida"
// });

// routes
app.get("/",function(req,res){
	res.redirect("/blog");
})
app.get("/blog",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("error hogaya bhai");
		}
		else
	res.render("index.ejs",{blogs:blogs});	
	})
	
})
// create
app.get("/blog/new",function(req,res){
	res.render("new.ejs");
})
app.post("/blog",function(req,res){
	Blog.create(req.body.blog,function(err,Newblog){
		if(err){
			res.render("new.ejs");
			alert("error!!");
		}
		else{
			res.redirect("/blog");
		}
	})
})
// show more blog content
app.get("/blog/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("erroenucdsjc");
			res.redirect("/blog");
		}
		else{
			res.render("show.ejs",{blogs:foundBlog});
		}
	})
})
// edit route
app.get("/blog/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blog");
		}
		else{
			res.render("edit.ejs",{blogs:foundBlog});	
		}
	})
})
// update route
app.put("/blog/:id",function(req,res){
   
	
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateblog){
		if(err){
			res.redirect("/blog/");
		}
		else
			res.redirect("/blog/"+req.params.id);

	})
})
app.listen(3000,function(req,res){
	console.log("Server Has STARTED!!!!!!!!!!!!!!!");
})