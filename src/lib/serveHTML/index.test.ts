import loadFile from './../loadFile.js';
import { HTMLPage } from './PageBuilder.js';
import { serveHtml } from './index.js';

describe('serveHtml', () => {
  it('should return a string of html with the given title and content', async () => {
    const title = 'Test Title';
    const page = 'main';
    const links = [{ href: '/test.css', rel: 'stylesheet' }];
    const expectedContent = (await loadFile(`client/pages/${page}.html`)).toString();
    const htmlPage = new HTMLPage({
      title,
      content: expectedContent,
      links,
    });
    const expectedHtml = htmlPage.getHtml();
    const actualHtml = await serveHtml({ title, page, links });
    expect(actualHtml).toEqual(expectedHtml);
  });

  it('should return an error 404 message if the file is not found', async () => {
    const title = 'Test Title';
    const page = 'invalidPage';
    const expectedContent = 'Error 404: Not found';
    const htmlPage = new HTMLPage({
      title,
      content: expectedContent,
      links: []
    });
    const expectedHtml = htmlPage.getHtml();
    const actualHtml = await serveHtml({ title, page });
    expect(actualHtml).toEqual(expectedHtml);
  });
});