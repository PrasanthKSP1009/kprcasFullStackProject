var express = require("express");
var path = require("path");
var mdb = require("mongoose");

var app = express();

mdb
  .connect("mongodb://localhost:27017/kprcas")
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
app.post("/submit-feedback", (req, res) => {
  const { name, feedback } = req.body;
  console.log(`Feedback received: ${name} - ${feedback}`);
  res.redirect("/?feedback=success");
});

app.listen(3001, () => {
  console.log("Backend Server Started Sucessfully");
});
