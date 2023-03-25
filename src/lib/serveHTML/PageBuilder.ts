import loadFile from '../loadFile.js';

const entryHtml = (await loadFile('client/entry.html')).toString();

export interface Link {
  rel: string;
  href: string;
}

interface IHTMLPage {
  title: string;
  content: string;
  links: readonly Link[];
}

export class HTMLPage implements IHTMLPage {
  readonly title: string;
  readonly content: string;
  readonly links: readonly Link[];
  readonly #html: string;

  constructor({ title, content, links }: IHTMLPage) {
    this.title = title;
    this.content = content;
    this.links = links;
    this.#html = this.buildHtml();
  }

  private buildHtml(): string {
    const { title, content, links } = this;
    return entryHtml
      .replace('{title}', title)
      .replace('{body}', content)
      .replace('{links}', HTMLPage.transformLinks(links));
  }

  private static transformLinks(links: readonly Link[]): string {
    return links
      .map((link) => {
        return `<link rel="${link.rel}" href="${link.href}" />`;
      })
      .join('\n');
  }

  getHtml(): string {
    return this.#html;
  }
}

export default HTMLPage;
