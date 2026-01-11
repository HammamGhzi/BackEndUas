import db from "../config/db.js";

export const getOrderDetails = (req, res) => {
    const query = `
        SELECT od.*, p.PRODUCT_NAME as product_name 
        FROM order_details od
        LEFT JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const getOrderDetailsById = (req, res) => {
    const { id } = req.params;
    const query = `
       SELECT od.*, p.PRODUCT_NAME as product_name 
        FROM order_details od
        LEFT JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
        WHERE od.ORDER_ID = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Order Details not found" });
        }
        res.json(results[0]);
    });
};

export const createOrderDetails = (req, res) => {
    const { qty, price, order_id, product_id } = req.body;

    if (!qty || !price || !order_id || !product_id) {
        return res.status(400).json({ message: "QTY, PRICE, ORDER_ID, and PRODUCT_ID are required" });
    }

    const query = "INSERT INTO order_details (QTY, PRICE, ORDER_ID, PRODUCT_ID) VALUES (?, ?, ?, ?)";

    db.query(query, [qty, price, order_id, product_id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid order detail: Category does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
            id: results.insertId,
            qty,
            price,
            order_id,
            product_id,
            message: "Order Details Berhasil Ditambahkan"
        });
    });
};

export const updateOrderDetails = (req, res) => {
    const { id } = req.params;
    const { qty, price, order_id, product_id } = req.body;

    if (!qty || !price || !order_id || !product_id) {
        return res.status(400).json({ message: "QTY, PRICE, ORDER_ID, and PRODUCT_ID are required" });
    }

    const query = "UPDATE order_details SET QTY = ?, PRICE = ?, ORDER_ID = ?, PRODUCT_ID = ? WHERE ORDER_DETAIL_ID = ?";

    db.query(query, [qty, price, order_id, product_id, id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_4') {
                return res.status(400).json({ message: "Invalid product_id: product_id does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Order Details not found" });
        }
        res.json({
            id,
            qty,
            price,
            order_id,
            product_id,
            message: "Order Details Berhasil di Update"
        });
    });
};

export const deleteOrderDetails = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM order_details WHERE ORDER_DETAIL_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Order Details not found" });
        }
        res.json({ message: "Order Details Berhasil Dihapus" });
    });
};