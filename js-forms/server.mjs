import express from "express";
import path from "node:path";

const WEB_DIR = path.resolve(".", "web");

const app = express();
app.use(express.static(WEB_DIR));

app.listen(3000, () => console.log("listening on port 3000..."));
