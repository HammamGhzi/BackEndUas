import express from "express";
import {
    getOrders,
    getOrderByOrderId,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderByOrderId);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;