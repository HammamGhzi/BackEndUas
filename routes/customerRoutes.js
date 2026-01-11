import express from "express";
import {
    getCustomers,
    getCustomerById,
    saveCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", saveCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
