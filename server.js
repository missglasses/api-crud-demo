const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;


// Allow JSON data
app.use(express.json());


// Serve index.html
app.use(express.static(__dirname));





// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});