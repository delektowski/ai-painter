import express from "express";
import {saveImgDataToDb} from "../db/database.mjs";
import {handleCreatePainting} from "../ai/handleCreatePainting.mjs";

const router = express.Router();

let prompt = '';

router.get("/", (req, res) => {
    res.render("pages/index", {imgSrc: null, prompt});
});

router.post("/", async (req, res) => {
    prompt = req.body?.prompt;

    if (prompt) {
        const date = new Date().toISOString();
        const imgData = await handleCreatePainting(prompt);
        res.render("pages/index", {imgSrc: imgData.imgSrc, prompt});
        saveImgDataToDb(prompt, date, imgData);
    }
});

export default router;
