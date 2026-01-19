import express from "express";
import {
    getGenders,
    getGenderById
} from "../controllers/genderController.js";

const router = express.Router();

router.get("/", getGenders);
router.get("/:id", getGenderById);
export default router;