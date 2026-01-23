import db from "../config/db.js";

export const getMostPurchasedProductsAndQuantitiesInThePreviousYear = (req, res) => {
    db.query(`
        SELECT PRODUCT_NAME AS PRODUCT, JUMLAH
        FROM(SELECT p.PRODUCT_NAME, SUM(od.QTY) AS JUMLAH FROM orders o 
        INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID 
        GROUP BY p.PRODUCT_NAME) AS sub_product 
        ORDER BY JUMLAH DESC LIMIT 1;`, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getWhoPlacedTheMostOrders = (req, res) => {
    db.query(`
        SELECT CUST_NAME AS CUSTOMER, JUMLAH
        FROM(SELECT c.CUST_NAME, COUNT(o.ORDER_ID) AS JUMLAH FROM orders o 
        INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
        GROUP BY c.CUST_NAME) AS sub_customer 
        ORDER BY JUMLAH DESC LIMIT 5;`, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getWhoHasTheHighestOrderValue = (req, res) => {
    db.query(`
        SELECT CUST_NAME AS CUSTOMER, NOMINAL
        FROM (SELECT c.CUST_NAME, SUM(o.TOTAL) AS NOMINAL FROM orders o
        INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
        GROUP BY c.CUST_NAME) AS sub_customer
        ORDER BY NOMINAL DESC LIMIT 5;
        `, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getMostProductItemsOrdered = (req, res) => {
    db.query(`
        SELECT CUSTOMER AS CUSTOMER, JUMLAH ITEM
        FROM (SELECT c.CUST_NAME AS CUSTOMER, SUM(od.QTY) AS JUMLAH FROM orders o
        INNER JOIN customers c ON o.CUST_ID = c.CUST_ID
        INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        GROUP BY c.CUST_NAME) AS sub_customer
        ORDER BY JUMLAH DESC LIMIT 5;
        `, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const get10BestSellingProducts = (req, res) => {
    db.query(`
        SELECT PRODUCT AS PRODUCT, JUMLAH
        FROM (SELECT p.PRODUCT_NAME AS PRODUCT, SUM(od.QTY) AS JUMLAH FROM orders o
        INNER JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        INNER JOIN products p ON od.PRODUCT_ID = p.PRODUCT_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY p.PRODUCT_NAME) AS sub_product
        ORDER BY JUMLAH DESC LIMIT 10;`, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getMonthlySalesProfitOfPreviousYearProducts = (req, res) => {
    db.query(`SELECT PRODUCT_NAME,
         SUM(CASE WHEN MONTH(ORDER_DATE) = 1 THEN QTY * od.PRICE END) AS JANUARI, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 2 THEN QTY * od.PRICE END) AS FEBRUARI, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 3 THEN QTY * od.PRICE END) AS MARET, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 4 THEN QTY * od.PRICE END) AS APRIL, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 5 THEN QTY * od.PRICE END) AS MEI, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 6 THEN QTY * od.PRICE END) AS JUNI,
         SUM(CASE WHEN MONTH(ORDER_DATE) = 7 THEN QTY * od.PRICE END) AS JULI, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 8 THEN QTY * od.PRICE END) AS AGUSTUS, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 9 THEN QTY * od.PRICE END) AS SEPTEMBER, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 10 THEN QTY * od.PRICE END) AS OKTOBER, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 11 THEN QTY * od.PRICE END) AS NOVEMBER, 
         SUM(CASE WHEN MONTH(ORDER_DATE) = 12 THEN QTY * od.PRICE END) AS DESEMBER,
         SUM(QTY * od.PRICE) AS TOTAL
         FROM order_details od 
         NATURAL JOIN orders o 
         NATURAL JOIN products p 
        WHERE YEAR(order_date) = (SELECT YEAR(SYSDATE()) - 1 FROM dual)
        GROUP BY PRODUCT_NAME 
        ORDER BY TOTAL DESC LIMIT 10;`, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getMonthlySalesFiguresInPreviousYearForTheProduct = (req, res) => {
    db.query("SELECT PRODUCT_NAME, SUM(CASE WHEN MONTH(ORDER_DATE)=1 THEN QTY END) AS JANUARI, SUM(CASE WHEN MONTH(ORDER_DATE)=2 THEN QTY END) AS FEBRUARI, SUM(CASE WHEN MONTH(ORDER_DATE)=3 THEN QTY END) AS MARET, SUM(CASE WHEN MONTH(ORDER_DATE)=4 THEN QTY END) AS APRIL, SUM(CASE WHEN MONTH(ORDER_DATE)=5 THEN QTY END) AS MEI, SUM(CASE WHEN MONTH(ORDER_DATE)=6 THEN QTY END) AS JUNI, SUM(CASE WHEN MONTH(ORDER_DATE)=7 THEN QTY END) AS JULI, SUM(CASE WHEN MONTH(ORDER_DATE)=8 THEN QTY END) AS AGUSTUS, SUM(CASE WHEN MONTH(ORDER_DATE)=9 THEN QTY END) AS SEPTEMBER, SUM(CASE WHEN MONTH(ORDER_DATE)=10 THEN QTY END) AS OKTOBER, SUM(CASE WHEN MONTH(ORDER_DATE)=11 THEN QTY END) AS NOVEMBER, SUM(CASE WHEN MONTH(ORDER_DATE)=12 THEN QTY END) AS DESEMBER FROM order_details NATURAL JOIN orders NATURAL JOIN products WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1 GROUP BY PRODUCT_NAME ORDER BY PRODUCT_NAME;", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const getLastYearCustomerMonthlyOrders = (req, res) => {
    db.query("SELECT c.cust_name, COUNT(CASE WHEN MONTH(o.order_date) = 1  THEN order_id END) AS januari, COUNT(CASE WHEN MONTH(o.order_date) = 2  THEN order_id END) AS februari, COUNT(CASE WHEN MONTH(o.order_date) = 3  THEN order_id END) AS maret, COUNT(CASE WHEN MONTH(o.order_date) = 4  THEN order_id END) AS april, COUNT(CASE WHEN MONTH(o.order_date) = 5  THEN order_id END) AS mei, COUNT(CASE WHEN MONTH(o.order_date) = 6  THEN order_id END) AS juni, COUNT(CASE WHEN MONTH(o.order_date) = 7  THEN order_id END) AS juli, COUNT(CASE WHEN MONTH(o.order_date) = 8  THEN order_id END) AS agustus, COUNT(CASE WHEN MONTH(o.order_date) = 9  THEN order_id END) AS september, COUNT(CASE WHEN MONTH(o.order_date) = 10 THEN order_id END) AS oktober, COUNT(CASE WHEN MONTH(o.order_date) = 11 THEN order_id END) AS november, COUNT(CASE WHEN MONTH(o.order_date) = 12 THEN order_id END) AS desember FROM orders o INNER JOIN customers c  ON o.CUST_ID = c.CUST_ID WHERE YEAR(o.order_date) = (SELECT YEAR(SYSDATE()) - 1 FROM dual) GROUP BY c.cust_name;", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};

export const getMonthlyOrderValuePerCustomerLastYear = (req, res) => {
    db.query("SELECT c.cust_name, SUM(CASE WHEN MONTH(o.order_date) = 1 THEN total END) AS januari, SUM(CASE WHEN MONTH(o.order_date) = 2 THEN total END) AS februari, SUM(CASE WHEN MONTH(o.order_date) = 3 THEN total END) AS maret, SUM(CASE WHEN MONTH(o.order_date) = 4 THEN total END) AS april, SUM(CASE WHEN MONTH(o.order_date) = 5 THEN total END) AS mei, SUM(CASE WHEN MONTH(o.order_date) = 6 THEN total END) AS juni, SUM(CASE WHEN MONTH(o.order_date) = 7 THEN total END) AS juli, SUM(CASE WHEN MONTH(o.order_date) = 8 THEN total END) AS agustus, SUM(CASE WHEN MONTH(o.order_date) = 9 THEN total END) AS september, SUM(CASE WHEN MONTH(o.order_date) = 10 THEN total END) AS oktober, SUM(CASE WHEN MONTH(o.order_date) = 11 THEN total END) AS november, SUM(CASE WHEN MONTH(o.order_date) = 12 THEN total END) AS desember FROM orders o INNER JOIN customers c ON o.cust_id = c.cust_id WHERE YEAR(o.order_date)=(SELECT YEAR(SYSDATE()) - 1 FROM dual) GROUP BY c.cust_name;", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};
export const getNumberOfCashierMonthlyServicesLastYear = (req, res) => {
    db.query("SELECT c.username, COUNT(CASE WHEN MONTH(o.order_date) = 1 THEN order_id END) AS januari, COUNT(CASE WHEN MONTH(o.order_date) = 2 THEN order_id END) AS februari, COUNT(CASE WHEN MONTH(o.order_date) = 3 THEN order_id END) AS maret, COUNT(CASE WHEN MONTH(o.order_date) = 4 THEN order_id END) AS april, COUNT(CASE WHEN MONTH(o.order_date) = 5 THEN order_id END) AS mei, COUNT(CASE WHEN MONTH(o.order_date) = 6 THEN order_id END) AS juni, COUNT(CASE WHEN MONTH(o.order_date) = 7 THEN order_id END) AS juli, COUNT(CASE WHEN MONTH(o.order_date) = 8 THEN order_id END) AS agustus, COUNT(CASE WHEN MONTH(o.order_date) = 9 THEN order_id END) AS september, COUNT(CASE WHEN MONTH(o.order_date) = 10 THEN order_id END) AS oktober, COUNT(CASE WHEN MONTH(o.order_date) = 11 THEN order_id END) AS november, COUNT(CASE WHEN MONTH(o.order_date) = 12 THEN order_id END) AS desember FROM orders o INNER JOIN cashiers c ON o.user_id = c.user_id WHERE YEAR(o.order_date)=(SELECT YEAR(SYSDATE()) - 1 FROM dual) GROUP BY c.username;", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(results);
    });
};