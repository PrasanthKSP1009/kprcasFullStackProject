var express = require("express");
var path = require("path");
var mdb = require("mongoose");
var User = require("./models/userSchema");

var app = express();

mdb
  .connect("mongodb+srv://kprcas:casfdp@cluster0.jvso6.mongodb.net/kprcas")
  .then(() => {
    console.log("MongoDB Connectionn Successful");
  })
  .catch((err) => {
    console.log("Check your Connection String");
  });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  var filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "gallery.html"));
});

// Handle requests with .html explicitly
app.get("/:page.html", (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, "pages", `${page}.html`));
});

app.post("/signup", (req, res) => {
  var { username, email, password } = req.body;
  console.log(username, email, password);
  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  user
    .save()
    .then(() => {
      console.log("New User Saved");
      res.redirect("/?user-added-success");
    })
    .catch((err) => {
      console.log(err);
      res.send("Invalid response");
    });
});

app.listen(3001, () => {
  console.log("Backend Server Started Sucessfully");
});
