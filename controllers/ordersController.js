import db from "../config/db.js";

export const getOrders = (req, res) => {
    const query = `
        SELECT o.*, m.METHOD as method        
        FROM orders o
        LEFT JOIN payment_methods m ON o.METHOD_ID = m.METHOD_ID
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const getOrderByOrderId = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT o.*, m.METHOD as method
        FROM orders o
        LEFT JOIN payment_methods m ON o.METHOD_ID = m.METHOD_ID
        WHERE o.ORDER_ID = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(results[0]);
    });
};

export const createOrder = (req, res) => {
    const { order_date, cust_id,user_id,total,method_id } = req.body;

    if (!order_date || !cust_id || !user_id || !total || !method_id) {
        return res.status(400).json({ message: "ORDER_DATE, CUST_ID, USER_ID, TOTAL, and METHOD_ID are required" });
    }

    const query = "INSERT INTO orders (ORDER_DATE, CUST_ID, USER_ID, TOTAL, METHOD_ID) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [order_date, cust_id, user_id, total, method_id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid order_id: order does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({
            id: results.insertId,
            order_date,
            cust_id,
            user_id,
            total,
            method_id,
            message: "Order Berhasil Ditambahkan"
        });
    });
};

export const updateOrder = (req, res) => {
    const { id } = req.params;
    const { order_date,cust_id,user_id,total,method_id } = req.body;

    if (!order_date || !cust_id || !user_id || !total || !method_id) {
        return res.status(400).json({ message: "ORDER_DATE, CUST_ID, USER_ID, TOTAL, and METHOD_ID are required" });
    }

    const query = "UPDATE orders SET ORDER_DATE = ?, CUST_ID = ?, USER_ID = ?, TOTAL = ?, METHOD_ID = ? WHERE ORDER_ID = ?";

    db.query(query, [order_date, cust_id, user_id, total, method_id, id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ message: "Invalid order_id: Order does not exist" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({
            id,
            order_date,
            cust_id,
            user_id,
            total,
            method_id,
            message: "Order Berhasil di Update"
        });
    });
};

export const deleteOrder = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE ORDER_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order Berhasil Dihapus" });
    });
};