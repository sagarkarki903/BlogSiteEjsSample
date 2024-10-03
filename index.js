const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); //setting our view engine
app.set("views", path.join(__dirname, "views")); //setting our path for views folder

app.use(express.static(path.join(__dirname, "public"))); //setting our path for public folder

let posts = [
    {
        id: uuidv4(),
        username:"karkisa",
        cwid: "30135337",
        content: "CS student"
    },

    {   
        id: uuidv4(),
        username:"sapkotara",
        cwid: "10125456",
        content: "CS student"

    },
    {
        id: uuidv4(),
        username:"rautp",
        cwid: "50005425",
        content: "CS student"
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    console.log(req.body);
    let {username, cwid, content} = req.body;
    let id = uuidv4(); //new variable for creating uuid for new elements being pushed in the posts array 
    posts.push({id, username, cwid, content});//esko mathi ko id 
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id); //here p is just a variable we made, p as in post so...
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", {post});
});

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(8080, () => {
    console.log("listening to port: 8080");
});