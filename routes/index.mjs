import express from "express";
import {saveImgDataToDb} from "../db/database.mjs";
import {handleCreatePainting} from "../ai/handleCreatePainting.mjs";

const router = express.Router();

let prompt = '';
let promptPainterName = '';

router.get("/", (req, res) => {


    res.render("pages/index", {imgSrc: null, prompt, promptPainterName});
});

router.post("/", async (req, res) => {
    prompt = req.body?.prompt || "the most beautiful place in the universe";
    promptPainterName = req.body?.promptPainterName || "Zdzislaw Beksinski";

    if (prompt) {
        const date = new Date().toISOString();
        const imgData = await handleCreatePainting(prompt, promptPainterName);
        const imgSrc = await saveImgDataToDb(prompt, promptPainterName, date, imgData);
        res.render("pages/index", {imgSrc, prompt, promptPainterName});
    }
});

export default router;
