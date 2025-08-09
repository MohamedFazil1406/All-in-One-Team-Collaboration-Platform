import { app } from "./libs/server.js";
import dotenv from "dotenv";
dotenv.config();

import createUserRouter from "./routes/createuser.js";
import signinUserRouter from "./routes/siginuser.js";

app.use("/", createUserRouter);
app.use("/", signinUserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
