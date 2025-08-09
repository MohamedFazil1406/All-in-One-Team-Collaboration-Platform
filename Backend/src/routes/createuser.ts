import express, { Router, type Request, type Response } from "express";
import { prisma } from "../libs/db.js";
import dotenv from "dotenv";
dotenv.config();
import { createUserSchema } from "../validation/uservalidation.js";
import bcrypt from "bcrypt";

const router = Router();
router.use(express.json());

router.post("/api/data", async (req: Request, res: Response) => {
  try {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, name, password } = parsed.data;

    const email_exists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (email_exists) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Data created successfully",
      user: result,
    });
    console.log("Data created successfully:", result);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
export { router as createUserRouter };
