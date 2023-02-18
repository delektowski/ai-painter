import express from "express";
import router from "./routes/index.mjs";
import { handlePaintingsTable } from "./db/database.mjs";

const app = express();
const PORT = 7070;
handlePaintingsTable();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
