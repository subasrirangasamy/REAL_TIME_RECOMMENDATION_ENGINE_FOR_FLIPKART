
const dummyCache = {};

// Simulate setting a value in Redis
const setCache = async (key, value, ttl = 3600) => {
  dummyCache[key] = { value, expires: Date.now() + ttl * 1000 };
  console.log(`[Cache] Set key: ${key} (TTL: ${ttl}s)`);
};

// Simulate getting a value from Redis
const getCache = async (key) => {
  const entry = dummyCache[key];

  if (!entry) {
    console.log(`[Cache] Miss key: ${key}`);
    return null;
  }

  // Check if expired
  if (Date.now() > entry.expires) {
    console.log(`[Cache] Expired key: ${key}`);
    delete dummyCache[key];
    return null;
  }

  console.log(`[Cache] Hit key: ${key}`);
  return entry.value;
};

module.exports = { setCache, getCache };