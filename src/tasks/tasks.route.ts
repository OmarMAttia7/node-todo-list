import type { FastifyInstance, RouteShorthandOptions } from 'fastify';
import tasksModel from '../data/index.js';

export async function tasksRoute(server: FastifyInstance): Promise<void> {
  server.post('/tasks', async (req, res) => {
    try {
      const payload = req.body as Record<string, unknown>;
      if (!('title' in payload) || typeof payload.title !== 'string') {
        void res.status(400).send('Error 400: bad request');
        return;
      }

      await tasksModel.create(payload.title);
      void res.redirect(302, '/');
      return;
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return 'Error 500: internal server error';
    }
  });

  server.post('/tasks/delete/:taskId', async (req, res) => {
    try {
      const params = req.params as { taskId: string };
      const taskId = Number(params.taskId);
      await tasksModel.delete(taskId);
      void res.redirect(302, '/');
      return;
    } catch (e) {
      console.log(e);
    }
  });

  const updateTaskOpts: RouteShorthandOptions = {
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          checked: { type: 'string' },
        },
        required: ['title'],
      },
    },
  };

  server.post('/tasks/update/:taskId', updateTaskOpts, async (req, res) => {
    const params = req.params as { taskId: string };
    const taskId = Number(params.taskId);
    const body = req.body as { title: string; checked: 'on' | undefined };
    await tasksModel.update(taskId, {
      title: body.title,
      checked: body.checked === 'on',
    });
    void res.redirect(302, '/');
  });
}
