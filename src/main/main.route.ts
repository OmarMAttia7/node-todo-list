import type { FastifyInstance } from 'fastify';
import tasksModel from '../data/index.js';
import serveHtml from '../lib/serveHtml.js';
import { listItem } from './lib/templates.js';
export async function mainRoute(server: FastifyInstance): Promise<void> {
  server.get('/', async (req, res) => {
    try {
      void res.header('Content-Type', 'text/html');
      const indexHtml = await serveHtml({
        title: 'Task Manager',
        page: 'main',
      });
      const tasks = await tasksModel.read();
      const qParams = new URL(req.hostname + req.url).searchParams;
      const editTaskId = Number(qParams.get('edit'));
      return indexHtml.toString().replace(
        '{{todos}}',
        tasks
          .map(({ id, title, checked }): string => {
            const edit = id === editTaskId;
            return listItem({ title, id, checked, edit });
          })
          .join('\n')
      );
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return 'Internal server error 500';
    }
  });
}
