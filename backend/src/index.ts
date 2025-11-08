/// <reference path="types/express.d.ts" />
import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { socketGateway } from './sockets/gateway';
import { logger } from './utils/logger';

const bootstrap = async () => {
  await connectDatabase();
  const app = createApp();
  const server = http.createServer(app);
  socketGateway.initialize(server);

  server.listen(env.port, () => {
    logger.info(`FreshVeggie API listening on port ${env.port}`);
  });
};

void bootstrap();

