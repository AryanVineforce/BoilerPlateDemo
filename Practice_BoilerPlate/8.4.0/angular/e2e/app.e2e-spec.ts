import { Practice_BoilerPlateTemplatePage } from './app.po';

describe('Practice_BoilerPlate App', function() {
  let page: Practice_BoilerPlateTemplatePage;

  beforeEach(() => {
    page = new Practice_BoilerPlateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
