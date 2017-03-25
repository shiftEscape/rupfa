import { Goal.IoPage } from './app.po';

describe('goal.io App', () => {
  let page: Goal.IoPage;

  beforeEach(() => {
    page = new Goal.IoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
