import loadFile from '../loadFile.js';
import { type Link, HTMLPage } from './PageBuilder.js';

interface ServeHtmlOptions {
  title: string;
  page: string;
  links?: Link[];
}

export default async function serveHtml({
  title,
  page,
  links = [],
}: ServeHtmlOptions): Promise<string> {
  let content: string = 'Error 404: Not found';
  try {
    content = (await loadFile(`client/pages/${page}.html`)).toString();
  } catch (e) {
    console.log(e);
  }

  const htmlPage = new HTMLPage({
    title,
    content,
    links,
  });
  return htmlPage.getHtml();
}
