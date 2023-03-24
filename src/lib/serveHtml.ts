import { readFile } from 'fs/promises';

interface Link {
  rel: string;
  href: string;
}

interface IHtmlPage {
  title: string;
  content: string;
  links: Link[];
}

interface ServeHtmlOptions {
  title: string;
  page: string;
  links?: Link[];
}

const entryHtml = (await readFile('client/entry.html')).toString();

class HtmlPage implements IHtmlPage {
  title: string;
  content: string;
  links: Link[];
  private readonly html: string;
  constructor({ title, content, links }: IHtmlPage) {
    this.title = title;
    this.content = content;
    this.links = links;
    this.html = this.buildHtml();
  }

  private buildHtml(): string {
    return entryHtml
      .replace('{title}', this.title)
      .replace('{body}', this.content)
      .replace('{links}', HtmlPage.transformLinks(this.links));
  }

  private static transformLinks(links: Link[]): string {
    return links
      .map((link) => {
        return `<link rel="${link.rel}" href="${link.href}" />`;
      })
      .join('\n');
  }

  getHtml(): string {
    return this.html;
  }
}

export default async function serveHtml({
  title,
  page,
  links = [],
}: ServeHtmlOptions): Promise<string> {
  let content: string = 'Error 404: Not found';
  try {
    content = (await readFile(`client/pages/${page}.html`)).toString();
  } catch (e) {
    console.log(e);
  }

  const htmlPage = new HtmlPage({
    title,
    content,
    links,
  });
  return htmlPage.getHtml();
}
