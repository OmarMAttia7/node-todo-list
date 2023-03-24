import { readFile } from 'fs/promises';

export default async function loadFile(filePath: string): Promise<Buffer> {
  return await readFile(filePath);
}
