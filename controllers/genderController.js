import db from "../config/db.js";

export const getGenders = (req, res) => {
    db.query("SELECT * FROM genders", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getGenderById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM genders WHERE GENDER_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(results[0]);
    });
};