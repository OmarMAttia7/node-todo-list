import loadFile from '../loadFile.js';
import { HTMLPage } from './PageBuilder.js';

describe('HTMLPage', () => {
  let htmlPage: HTMLPage;
  let expectedHtml: string;
  beforeEach(async () => {
    const entryHtml = (await loadFile('client/entry.html')).toString();
    const title = 'Test Title';
    const content = 'Test Content';
    const links = [{ rel: 'stylesheet', href: '/style.css' }];
    htmlPage = new HTMLPage({ title, content, links });
    expectedHtml = entryHtml
      .replace('{title}', title)
      .replace('{body}', content)
      .replace(
        '{links}',
        links
          .map((link) => {
            return `<link rel="${link.rel}" href="${link.href}" />`;
          })
          .join('\n')
      );
  });

  it('should have a title', () => {
    expect(htmlPage.title).toBe('Test Title');
  });

  it('should have content', () => {
    expect(htmlPage.content).toBe('Test Content');
  });

  it('should have links', () => {
    expect(htmlPage.links).toEqual([{ rel: 'stylesheet', href: '/style.css' }]);
  });

  it('should build the correct HTML', () => {
    expect(htmlPage.getHtml()).toBe(expectedHtml);
  });
});
