import dns from 'node:dns/promises';
import app from './app';
import connectDb from './config/db-config';

dns.setServers(['1.1.1.1']);

const startServer = async () => {
  await connectDb();
  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
