import { app } from "./app.js";
import { ENV } from "./src/config/dotenv.js";
app.listen(ENV.PORT, () => {
  console.log("connected successfully !");
});
