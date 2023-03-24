import Fastify from 'fastify';
import { mainRoute } from './main/main.route.js';
import formBodyPlugin from '@fastify/formbody';
import { tasksRoute } from './tasks/tasks.route.js';

const server = Fastify({
  logger: false,
});

void server.register(formBodyPlugin);
void server.register(mainRoute);
void server.register(tasksRoute);

const start = async (): Promise<void> => {
  await server.listen({ port: 3000 });
  console.log('Server is running at http://localhost:3000');
};

start()
  .then(async () => {
    
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
