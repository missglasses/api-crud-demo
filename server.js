const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

/* 

npm init -y
npm install express mysql2

*/

// Allow JSON data
app.use(express.json());


// Serve index.html
app.use(express.static(__dirname));


// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});


// Test database connection
db.connect((err) => {

    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");

});


// ========================================
// GET - Retrieve Students
// ========================================

app.get("/api/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);

    });

});


// ========================================
// POST - Insert Student
// ========================================

app.post("/api/students", (req, res) => {

    const name = req.body.name;
    const course = req.body.course;
    const year_level = req.body.year_level;


    const sql = `
        INSERT INTO students
        (name, course, year_level)
        VALUES (?, ?, ?)
    `;


    db.query(
        sql,
        [name, course, year_level],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }


            res.status(201).json({
                message: "Student added successfully",
                id: result.insertId
            });

        }
    );

});


// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});