import express, { Router, type Request, type Response } from "express";
import { prisma } from "../libs/db.js";
import dotenv from "dotenv";
dotenv.config();
import { SigninUserSchema } from "../validation/uservalidation.js";
import bcrypt from "bcrypt";
const router = Router();
router.use(express.json());

router.post("/api/signin", async (req: Request, res: Response) => {
  try {
    const parsed = SigninUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        error: "Password not set for this user",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const result = await prisma.login.create({
      data: {
        userId: user.id,

        loginAt: new Date(), // Store the login time
      },
    });

    res.status(201).json({
      message: "Signin successful",
      user: result,
    });
    console.log("Login record created:", result);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
export { router as signinUserRouter };
