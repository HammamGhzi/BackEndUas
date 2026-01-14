import db from "../config/db.js";

export const getCustomers = (req, res) => {
    db.query("SELECT * FROM customers", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const saveCustomer = (req, res) => {
    const { nama, address, place_of_birth, date_of_birth, contact_number, email, gender_id } = req.body;
    console.log("Request Body:", req.body);


    db.query(
        "INSERT INTO customers  ( CUST_NAME, ADDRESS, PLACE_OF_BIRTH, DATE_OF_BIRTH, CONTACT_NUMBER, EMAIL, GENDER_ID) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nama, address, place_of_birth, date_of_birth, contact_number, email, gender_id],
        (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            res.json({
                id: results.insertId,
                nama,
                address,
                place_of_birth,
                date_of_birth,
                contact_number,
                email,
                gender_id
            });
        });
};

export const getCustomerById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM customers WHERE CUST_ID = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json(results[0]);
    });
};
export const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { nama, address, place_of_birth, date_of_birth, contact_number, email, gender_id} = req.body;

    if (!nama || !address || !place_of_birth || !date_of_birth ||  !contact_number || !email || !gender_id) {
        return res.status(400).json({ message: " nama, address, place_of_birth, date_of_birth, contact_number, email, gender_id is required" });
    }

    db.query("UPDATE customers SET CUST_NAME = ?, ADDRESS = ?, PLACE_OF_BIRTH = ?, DATE_OF_BIRTH = ?, CONTACT_NUMBER = ?, EMAIL = ?, GENDER_ID = ? WHERE CUST_ID = ?", [nama, address, place_of_birth, date_of_birth, contact_number, email, gender_id,id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json({
            id,
            nama,
            address,
            place_of_birth,
            date_of_birth,
            contact_number,
            email,
            gender_id,
            message: "Customer updated successfully"
        });
    });
};

export const deleteCustomer = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM customers WHERE CUST_ID = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json({message: "Customer deleted successfully"});
    });
};