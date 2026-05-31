let page;

const openPage = async (url) => {
  page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });
};

const closePage = async () => {
  await page.close();
};

const getMainHeaderText = async () => {
  await page.waitForSelector('main h1');

  return page.$eval('main h1', (header) => header.textContent.trim());
};

describe('Github team page tests', () => {
  beforeEach(async () => {
    await openPage('https://github.com/team');
  });

  afterEach(async () => {
    await closePage();
  });

  test(
    'The h1 header content',
    async () => {
      const title = await page.title();

      expect(title).toContain('GitHub');
    },
    15000
  );

  test(
    'The first link attribute',
    async () => {
      const actual = await page.$eval('a', (link) => link.getAttribute('href'));

      expect(actual).toEqual('#start-of-content');
    },
    10000
  );

  test(
    'The page contains Get started button',
    async () => {
      const btnSelector = '.btn-large-mktg.btn-mktg';

      await page.waitForSelector(btnSelector, {
        visible: true,
      });

      const actual = await page.$eval(btnSelector, (link) => link.textContent.trim());

      expect(actual).toContain('Get started');
    },
    10000
  );
});

describe('Github additional page header tests', () => {
  afterEach(async () => {
    await closePage();
  });

  test(
    'The Enterprise page has h1 header',
    async () => {
      await openPage('https://github.com/enterprise');

      const actual = await getMainHeaderText();

      expect(actual.length).toBeGreaterThan(0);
    },
    15000
  );

  test(
    'The Features page has h1 header',
    async () => {
      await openPage('https://github.com/features');

      const actual = await getMainHeaderText();

      expect(actual.length).toBeGreaterThan(0);
    },
    15000
  );

  test(
    'The Security page has h1 header',
    async () => {
      await openPage('https://github.com/security');

      const actual = await getMainHeaderText();

      expect(actual.length).toBeGreaterThan(0);
    },
    15000
  );
});
