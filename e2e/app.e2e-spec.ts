import { BulkiPage } from './app.po';

describe('bulki App', function() {
  let page: BulkiPage;

  beforeEach(() => {
    page = new BulkiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
