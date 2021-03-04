export default {
  name: process.env.APP_NAME,
  port: parseInt(process.env.APP_SERVER_PORT, 10) || 5000,
  node_env: process.env.NODE_ENV,
  api_version: process.env.APP_VERSION,
  api_key: process.env.API_KEY || 'v1',
  cors: process.env.CORS_ALLOWED_DOMAIN,
};
