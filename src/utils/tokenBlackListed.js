import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

// Optional: Eager connect at startup
await connectRedis();

/**
 * Add a JWT token to the Redis blacklist
 * @param {string} token - JWT token to blacklist
 * @param {number} ttlSeconds - Time in seconds until the token expires
 */
export async function addBlacklistToken(token, ttlSeconds) {
  await connectRedis();
  await redisClient.set(`blacklist:${token}`, 'true', {
    EX: ttlSeconds,
  });
}

/**
 * Check if a token is blacklisted
 * @param {string} token - JWT token to check
 * @returns {Promise<boolean>} - True if blacklisted
 */
export async function isTokenBlacklisted(token) {
  await connectRedis();
  const result = await redisClient.get(`blacklist:${token}`);
  return result === 'true';
}
