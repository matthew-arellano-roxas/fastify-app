import 'dotenv/config';
import { serverConfig } from '@root/config';
import fastify from 'fastify';

// Create Fastify instance
const app = fastify({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: serverConfig.PORT });
    console.log(`Server running at http://localhost:${serverConfig.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
