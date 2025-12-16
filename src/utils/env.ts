// src/utils/env.ts
const requiredEnvVars = ['VITE_API_URL', 'VITE_APP_NAME'];

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
