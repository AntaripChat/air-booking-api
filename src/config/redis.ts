import { createClient } from "redis";

export const redis = createClient();

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

export async function connectRedis() {
  try {
    await redis.connect();
    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection failed", error);
  }
}
