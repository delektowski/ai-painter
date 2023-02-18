import dotenv from "dotenv";
import {Configuration, OpenAIApi} from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";
import {generateTitle} from "../lib/helpers.mjs";

dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const opeanai = new OpenAIApi(configuration);

async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(filepath))
            .on("error", reject)
            .once("close", () => {
                return resolve(filepath);
            });
    });
}


export async function handleCreatePainting(prompt) {
    const response = await opeanai.createImage({
        prompt: `${prompt} by Zdzislaw Beksinski.`,
        n: 1,
        size: "512x512",
    });
    const filepath = path.join("public", "img", `${generateTitle(prompt)}.jpg`);
    await downloadImage(response.data.data[0].url, filepath);
    return {imgSrc: response.data.data[0].url, filepath};
}
