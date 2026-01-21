import express from "express";
import {
    getOrders,
    getOrderByOrderId,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetailsByOrder
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderByOrderId);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/get", getOrderDetailsByOrder)

export default router;