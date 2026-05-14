import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.listen(3333, () => {
  console.log("Server running");
});