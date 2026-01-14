import db from "../config/db.js";

export const getProducts = (req, res) => {
    const query = `
        SELECT p.*, c.CATEGORY as category_name 
        FROM products p
        LEFT JOIN product_categories c ON p.CATEGORY_ID = c.CATEGORY_ID
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};


export const getProductById = (req, res) => {
    const { id } = req.params;
    const query = `
       SELECT p.*, c.CATEGORY as category_name 
        FROM products p
        LEFT JOIN product_categories c ON p.CATEGORY_ID = c.CATEGORY_ID
        WHERE p.PRODUCT_ID = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(results[0]);
    });
};


export const createProduct = (req, res) => {
    const { category_id, name, price,created_at,created_by,stock, updated_at,updated_by } = req.body;

    if (!category_id || !name || !price || !created_at || !created_by || !stock || !updated_at || !updated_by) {
        return res.status(400).json({ message: "CATEGORY_ID, PRODUCT_NAME, PRICE , CREATED_AT , CREATED_BY ,STOCK, UPDATE_AT, UPDATE_BY  are require" });
    }

    const query = "INSERT INTO products (CATEGORY_ID, PRODUCT_NAME, PRICE,CREATED_AT,CREATED_BY,STOCK,UPDATED_AT,UPDATED_BY) VALUES (?, ?, ?,?,?,?,?,?)";

    db.query(query, [category_id, name, price,created_at,created_by,stock, updated_at, updated_by], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid category_id: Category does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
            id: results.insertId,
            category_id,
            name,
            price,
            created_at, 
            created_by,
            stock,
            updated_at,
            updated_by,
            message: "Product Berhasil Ditambahkan"
        });
    });
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { category_id, name, price , stock, updated_at, updated_by } = req.body;

    if (!category_id || !name || !price || !stock || !updated_at || !updated_by) {
        return res.status(400).json({ message: "Category ID, Name, Price, Stock, Updated At and Updated By are required" });
    }

    const query = "UPDATE products SET CATEGORY_ID = ?, PRODUCT_NAME = ?, PRICE = ?, STOCK = ?, UPDATED_AT = ?, UPDATED_BY = ? WHERE PRODUCT_ID = ?";

    db.query(query, [category_id, name, price, stock, updated_at, updated_by, id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid category_id: Category does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({
            id,
            category_id,
            name,
            price,
            stock,
            updated_at,
            updated_by,
            message: "Product Berhasil di Update"
        });
    });
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE PRODUCT_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product Berhasil Dihapus" });
    });
};