import { app } from "./app.js";
import { connectDB } from "./data/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend is working");
});
