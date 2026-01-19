import db from "../config/db.js";

export const getKASIR = (req, res) => {
    db.query("SELECT * FROM cashiers", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getKasirById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM cashiers WHERE USER_ID = ?", [id], (err, results) => {
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