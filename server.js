const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;


// Allow JSON data
app.use(express.json());


// Serve index.html
app.use(express.static(__dirname));


// ========================================
// Connect MySQL
// ========================================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");
});


// ========================================
// GET - Retrieve all students
// ========================================

app.get("/api/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// ========================================
// POST - Create a student
// ========================================

app.post("/api/students", (req, res) => {
    const { name, course } = req.body;
    const sql = "INSERT INTO students (name, course) VALUES (?, ?)";

    db.query(sql, [name, course], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Student added", id: result.insertId });
    });
});


// ========================================
// PUT - Update a student
// ========================================

app.put("/api/students/:id", (req, res) => {
    const { name, course } = req.body;
    const sql = "UPDATE students SET name = ?, course = ? WHERE id = ?";

    db.query(sql, [name, course, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Student updated" });
    });
});


// ========================================
// DELETE - Remove a student
// ========================================

app.delete("/api/students/:id", (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Student deleted" });
    });
});



//INSERT STUDENT 
app.post("/api/students", (req, res) => {
    const { name, course, year_level } = req.body;

    const sql = `
        INSERT INTO students (name, course, year_level)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, course, year_level],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                    message: err.message
                });
            } else {
                return res.status(201).json({
                    message: "Student added successfully",
                    id: result.insertId
                });
            }
        }
    );
});


// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});