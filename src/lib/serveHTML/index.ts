import loadFile from './../loadFile.js';
import { type Link, HTMLPage } from './PageBuilder.js';

interface ServeHtmlOptions {
  title: string;
  page: string;
  links?: Link[];
}

export async function serveHtml({
  title,
  page,
  links = [],
}: ServeHtmlOptions): Promise<string> {
  let content: string;
  try {
    content = (await loadFile(`client/pages/${page}.html`)).toString();
  } catch (e) {
    console.log(e);
    content = 'Error 404: Not found';
  }

  const htmlPage = new HTMLPage({
    title,
    content,
    links,
  });
  return htmlPage.getHtml();
}
