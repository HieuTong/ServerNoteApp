const express = require("express");
const mongoose = require("mongoose");

var app = express();
const Data = require("./noteSchema");

mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true });

mongoose.connection
  .once("open", () => {
    console.log("Connected to DB!");
  })
  .on("error", (error) => {
    console.log("Failed to connect " + error);
  });

//create a note
//post request
app.post("/create", (req, res) => {
  var note = new Data({
    note: req.get("note"),
    title: req.get("title"),
    date: req.get("date"),
  });

  note.save().then(() => {
    if (note.isNew == false) {
      console.log("Save data!");
      res.send("Save data!");
    } else {
      console.log("Failed to save data");
    }
  });
});

//http://192.168.1.11:8081/create
var server = app.listen(8081, "localhost", () => {
  console.log("Server is running!");
});

//delete a note
//post request

app.post("/delete", (req, res) => {
  Data.findOneAndRemove(
    {
      _id: req.get("id"),
    },
    (err) => {
      console.log("Failed" + err);
    }
  );

  res.send("Delete!");
});

//update a note
//post request

app.post("/update", (req, res) => {
  Data.findOneAndUpdate(
    {
      _id: req.get("id"),
    },
    {
      note: req.get("note"),
      title: req.get("title"),
      date: req.get("date"),
    },
    (err) => {
      console.log("Failed to update" + err);
    }
  );

  res.send("Updated!");
});

//fetch all notes
//get request
app.get("/fetch", (req, res) => {
  Data.find({}).then((DBitems) => {
    res.send(DBitems);
  });
});
