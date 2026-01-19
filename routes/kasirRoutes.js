import express from "express";
import {
    getKASIR,
    getKasirById
} from "../controllers/kasirController.js";

const router = express.Router();

router.get("/", getKASIR);
router.get("/:id", getKasirById);
export default router;