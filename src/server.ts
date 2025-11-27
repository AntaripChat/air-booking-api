import app from "./app";
import { SERVER_CONFIG } from "./config/server.config";
import { connectDB } from "./config/db.config";

const PORT = SERVER_CONFIG.PORT;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
