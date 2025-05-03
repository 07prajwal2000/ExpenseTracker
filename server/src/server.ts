import { app } from ".";
import { logInfo } from "./lib/logger";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logInfo(`Server listening on http://localhost:${port}`);
});