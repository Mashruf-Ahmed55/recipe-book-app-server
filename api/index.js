import http from 'http';
import app from '../src/app.js';
import envConfig from '../src/config/envConfig.js';
import connectDB from '../src/db/dbConnection.js';

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  server.listen(envConfig.port, () => {
    console.log(`Server is running on http://localhost:${envConfig.port}`);
  });
};

startServer();
