import app from "./app";
import { SERVER_CONFIG } from "./config/server.config";
import { connectDB } from "./config/db.config";
import { connectRedis } from "./config/redis"; 

const PORT = SERVER_CONFIG.PORT;

async function startServer() {
  // Connect to MongoDB
  await connectDB();

  // Connect to Redis
  await connectRedis(); 

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

startServer();
