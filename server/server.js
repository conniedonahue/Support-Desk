import express from "express";
import apiRouter from "./routes/api.js";
import cors from "cors";
import ViteExpress from "vite-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(__dirname + "/public/"));

//set up the router here for '/
app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  ViteExpress.config({ mode: "production" });
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
} else {
  ViteExpress.config({ mode: "development" });
}

// Unknown route handler
app.use("*", (req, res) => res.status(404));

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

ViteExpress.listen(app, PORT, () => console.log(`Listening on PORT: ${PORT}`));
