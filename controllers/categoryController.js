import db from "../config/db.js";

export const getCategories = (req, res) => {
    db.query("SELECT * FROM product_categories", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const saveCategory = (req, res) => {
    const { name , id} = req.body;
    console.log("Request Body:", req.body);


    db.query(
        "INSERT INTO product_categories (CATEGORY_ID,CATEGORY) VALUES (?,?)",
        [id,name],
        (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.json({
                id: results.insertId,
                name,
            });
        });
};


export const getCategoryById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM product_categories WHERE CATEGORY_ID = ?", [id], (err, results) => {
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

export const createCategory = (req, res) => {
    const { name,id } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    db.query("INSERT INTO product_categories (CATEGORY_ID,CATEGORY) VALUES (?,?)", [id,name], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
            id: results.insertId,
            name,   
            message: "Category created successfully"
        });
    });
};

export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    db.query("UPDATE product_categories SET CATEGORY = ? WHERE CATEGORY_ID = ?", [name, id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({
            id,
            name,
            message: "Category updated successfully"
        });
    });
};

export const deleteCategory = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM product_categories WHERE CATEGORY_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({ message: "Cannot delete category content that is referenced by products" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    });
};

export const getProductsByCategory = (req, res) => {
    const { id } = req.params;      
   db.query("SELECT * FROM products WHERE CATEGORY_ID = ?", [id], (err, results) => {
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


