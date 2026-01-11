import express from "express";
import {
    getOrderDetails,
    getOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails
} from "../controllers/orderDetailsController.js";

const router = express.Router();

router.get("/", getOrderDetails);
router.get("/:id", getOrderDetailsById);
router.post("/", createOrderDetails);
router.put("/:id", updateOrderDetails);
router.delete("/:id", deleteOrderDetails);
export default router;