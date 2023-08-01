const express = require("express");
const app = express();
const cors = require("cors");
// Router file imports
// Router file imports
const authRouter = require("./Routes/auth/auth");
const taskRouter = require("./Routes/tasks/tasks");
const jwt = require("jsonwebtoken");

app.use(express.json());
const PORT = process.env.PORT || 4000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
// Sending token in headers middlewhere 
const authorize = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res
        .status(401)
        .send({ status: "error", message: "Missing or Invalid token" });
    }
  } else {
    res
      .status(401)
      .send({ status: "error", message: "Missing or Invalid token" });
  }
};
// Using imported Routers
app.use("/auth", authRouter);
app.use("/tasks", authorize, taskRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
