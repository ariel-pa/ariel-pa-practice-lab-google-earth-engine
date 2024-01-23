const express = require("express");
const cors = require("cors");


/* CONFIGURATION */
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

/**
 * API REST
 */
// app.use("/api", require("./src/routes"));

function main() {
    try {
        app.listen(3006);
        console.log(`Server on port ${3006}`);
    } catch (error) {
        console.error('', error);
    }
}
main();