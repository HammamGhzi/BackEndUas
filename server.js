import express from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";
import kasirRoutes from "./routes/kasirRoutes.js";
import genderRoutes from "./routes/genderRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/orders", ordersRoutes);
app.use("/order_details", orderDetailsRoutes);
app.use("/kasirs", kasirRoutes);
app.use("/genders", genderRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});