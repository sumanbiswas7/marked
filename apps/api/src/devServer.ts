import { app } from "./server";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Running on http://localhost:${PORT}/`);
});
