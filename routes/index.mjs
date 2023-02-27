import express from "express";
import {getLastNItems, saveImgDataToDb} from "../db/database.mjs";
import {handleCreatePainting} from "../ai/handleCreatePainting.mjs";

const router = express.Router();

let prompt = '';
let promptPainterName = '';
let imgSrc = ''


router.get("/", async (req, res) => {
    const lastImages = await getLastNItems(5);
    console.log("lastImages", lastImages)
    res.render("pages/index", {imgSrc: null, prompt, promptPainterName, lastImages,clickHandler:"showClickedImage();" });
});

router.post("/", async (req, res) => {
    prompt = req.body?.prompt || "The most beautiful place in the universe";
    promptPainterName = req.body?.promptPainterName || "Zdzislaw Beksinski";

    if (prompt) {
        const date = new Date().toISOString();

        const imgData = await handleCreatePainting(prompt, promptPainterName);
        imgSrc = await saveImgDataToDb(prompt, promptPainterName, date, imgData);
        const lastImages = await getLastNItems(5);
        res.render("pages/index", {imgSrc, prompt, promptPainterName, lastImages});
    }
});

export default router;
