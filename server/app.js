const mongoose = require("mongoose");
const express = require("express");
const applicationRunning = require("./router/api.js");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentRoute = require("./router/StudentRoute.js");
const adminRoute = require("./router/AdminRoute.js");
const env = require("dotenv");

const app = express();
const port = 3001;
const hostname = "localhost";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
env.config();

const url='mongodb+srv://harsh:seprojectgroup6@cluster0.1uf07.mongodb.net/Library?retryWrites=true&w=majority';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api", applicationRunning);
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);

app.listen(3001, () => {

    console.log("Server running");
});