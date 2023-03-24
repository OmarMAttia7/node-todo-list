import db from './db.js';

export interface Task {
  title: string;
  id: number;
  checked: boolean;
}

export class TasksModel {
  async read(): Promise<Task[]> {
    const stmt = db.prepare('SELECT * FROM tasks;');
    const tasks = stmt.all() as Task[];
    return tasks;
  }

  async create(title: string): Promise<void> {
    const stmt = db.prepare('INSERT INTO tasks (title) VALUES(?)');
    stmt.run(title);
  }

  async delete(id: number): Promise<void> {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
  }

  async update(
    id: number,
    { title, checked }: { title: string; checked?: boolean }
  ): Promise<void> {
    const stmt = db.prepare(`UPDATE tasks SET title = ? ${(checked ?? false) ? ', checked = true': ', checked = false'} WHERE id = ?`);
    stmt.run(title, id);
  }
}

const tasksModel = new TasksModel();

export default tasksModel;
