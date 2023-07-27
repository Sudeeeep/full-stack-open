import express from "express";
import bodyParser from "body-parser";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientRouter from "./routes/patientRouter";
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
