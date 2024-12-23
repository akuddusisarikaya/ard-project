import express from "express";
import cors from "cors";
import connectDB from "./db";
import auth from "./routes/auth";
import application from "./routes/application";
import cases from "./routes/case";
import court from "./routes/court";
import doc from "./routes/doc";
import user from "./routes/user";
import uploadRouter from "./upload/uploadRouter";
import AWSRouter from "./upload/AWSRouter";

const app = express();
const port = process.env.PORT;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", uploadRouter);
app.use("/api", auth);
app.use("/api", application);
app.use("/api", cases);
app.use("/api", court);
app.use("/api", doc);
app.use("/api", user);
app.use("/api", AWSRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
