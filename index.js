const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs"); //setting our view engine
app.set("views", path.join(__dirname, "views")); //setting our path for views folder

app.use(express.static(path.join(__dirname, "public"))); //setting our path for public folder

let posts = [
    {
        username:"karkisa",
        cwid: "30135337"
    },

    {
        username:"sapkotara",
        cwid: "10125456"

    },
    {
        username:"rautp",
        cwid: "50005425"
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.listen(8080, () => {
    console.log("listening to port: 8080");
});