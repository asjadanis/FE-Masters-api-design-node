import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});
