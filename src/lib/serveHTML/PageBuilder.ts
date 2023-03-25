import loadFile from "../loadFile.js";

export interface Link {
  rel: string;
  href: string;
}

interface IHTMLPage {
  title: string;
  content: string;
  links: Link[];
}

const entryHtml = (await loadFile('client/entry.html')).toString();

export class HTMLPage implements IHTMLPage {
  readonly title: string;
  readonly content: string;
  readonly links: Link[];
  readonly #html: string;
  constructor({ title, content, links }: IHTMLPage) {
    this.title = title;
    this.content = content;
    this.links = links;
    this.#html = this.buildHtml();
  }

  private buildHtml(): string {
    return entryHtml
      .replace('{title}', this.title)
      .replace('{body}', this.content)
      .replace('{links}', HTMLPage.transformLinks(this.links));
  }

  private static transformLinks(links: Link[]): string {
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