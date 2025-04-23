import { Router } from "express";
import { login, logout, register } from "../controllers/AuthController.js";
import {
  validateLoginInputs,
  validateRegisterInputs,
} from "../utils/validators.js";

const router = Router();

router.post("/register", validateRegisterInputs, register);
router.post("/login", validateLoginInputs, login);
router.get("/logout", logout);

export default router;
