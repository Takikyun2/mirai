import { Router } from "express";
import { register, login } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Autenticado!", user: req.user });
});

export default router;
