import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

app.listen(config.port, () => {
  console.log(`Server is listening on: http://localhost:${config.port}`);
});
