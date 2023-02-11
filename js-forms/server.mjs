import express from "express";
import multer from "multer";
import cors from "cors";
import path from "node:path";

const WEB_DIR = path.resolve(".", "web");
const UPLOAD_DIR = path.resolve(".", "uploads");

const upload = multer({ dest: UPLOAD_DIR });

const app = express();
app.use(cors());
app.use(express.static(WEB_DIR));

app.post("/api/form/:formId", upload.any(), (req, res) => {
  console.log({
    formId: req.params.formId,
    body: req.body,
    files: req.files,
  });

  res.end();
});

app.listen(3000, () => console.log("listening on port 3000..."));
