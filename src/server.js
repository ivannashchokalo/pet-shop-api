import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import animalsRoutes from "./routes/animalsRoutes.js";
import requestsRoutes from "./routes/requestsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errors } from "celebrate";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware/authenticate.js";
import usersRoutes from "./routes/usersRoutes.js";
import { logger } from "./middleware/logger.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";

const PORT = process.env.PORT ?? 3000;
const CLIENT_URL = process.env.CLIENT;
const ADMIN_URL = process.env.ADMIN;
const CLIENT_URL_LOCAL = process.env.CLIENT_LOCAL;
const ADMIN_URL_LOCAL = process.env.ADMIN_LOCAL;
const app = express();

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: [CLIENT_URL, ADMIN_URL, CLIENT_URL_LOCAL, ADMIN_URL_LOCAL],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/animals", animalsRoutes);
app.use("/requests", requestsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/statistics", statisticsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
