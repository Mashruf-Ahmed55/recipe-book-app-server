import 'dotenv/config';

const _config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
};

const envConfig = Object.freeze(_config);
export default envConfig;
