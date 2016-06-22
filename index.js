var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");
    
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Schema Setup
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
   title: "First Post",
   image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=61282cfeed75871385c84c2a44a8e594",
   body:  "Look at the most beautiful mountains and the greatest space in Canada!"
}, function(err, blog) {
    if(err) {
        console.log(err);
    } else {
        console.log(blog);
    }
});*/

//Routing
app.get("/", function(req, res) {
    res.redirect("/blogs");    
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if(err) {
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server is listening..."); 
});

