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
router.get("/:OD_ID", getOrderDetailsById);
router.post("/", createOrderDetails);
router.put("/:OD_ID", updateOrderDetails);
router.delete("/:OD_ID", deleteOrderDetails);

export default router;