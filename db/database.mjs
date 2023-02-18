import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/paintings.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the paintings database.");
});

export function handlePaintingsTable() {
    db.serialize(() => {
        db.run(
            "CREATE TABLE IF NOT EXISTS paintings ( id INTEGER PRIMARY KEY, title TEXT, date varchar(40), imgSrc TEXT)"
        );
    });
}

export function saveImgDataToDb(prompt,date,imgData) {
    db.run(
        `INSERT INTO paintings (title,date,imgSrc) VALUES (?,?,?)`,
        [prompt, date, imgData.filepath],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowId ${this.lastID}`);
        }
    );
}

