const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const studentRoute = require("./router/StudentRoute.js");
const adminRoute = require("./router/AdminRoute.js");
const applicationRunning = require("./router/api.js");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api", applicationRunning);
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);

let gfs;

connection.once("open", () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get("/", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render("index", { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render("index", { files: files });
    }
  });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post("/upload", upload.single("file"), (req, res) => {
  // res.json({ file: req.file });
  res.redirect("/");
});

app.post("/allfiles", (req, res) => {
  gfs.files.find({}).toArray((err, files) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json({ files });
  });
});

// @route GET /files
// @desc  Display all files in JSON
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    // return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect("/");
  });
});

app.listen(3001, function () {
  console.log("Server started on port 7000");
});
