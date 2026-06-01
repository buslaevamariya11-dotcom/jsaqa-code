const clickElement = async (page, selector) => {
  await page.waitForSelector(selector, {
    visible: true,
  });

  await page.click(selector);
};

const getText = async (page, selector) => {
  await page.waitForSelector(selector, {
    visible: true,
  });

  return page.$eval(selector, (element) => element.textContent.trim());
};

const openSession = async (page) => {
  await page.waitForSelector('.page-nav__day', {
    visible: true,
  });

  const days = await page.$$('.page-nav__day');

  await days[1].click();

  await page.waitForSelector('.movie-seances__time', {
    visible: true,
  });

  const sessions = await page.$$('.movie-seances__time');

  await Promise.all([
    page.waitForNavigation({
      waitUntil: 'domcontentloaded',
    }),
    sessions[0].click(),
  ]);

  await page.waitForSelector('.buying-scheme__wrapper', {
    visible: true,
  });
};

const getAvailableSeats = async (page) => {
  await page.waitForSelector('.buying-scheme__chair', {
    visible: true,
  });

  return page.$$(
    '.buying-scheme__chair:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)'
  );
};

const selectAvailableSeats = async (page, count) => {
  const seats = await getAvailableSeats(page);

  if (seats.length < count) {
    throw new Error(`Недостаточно свободных мест. Нужно: ${count}, доступно: ${seats.length}`);
  }

  for (let i = 0; i < count; i += 1) {
    await seats[i].click();
  }

  await page.waitForSelector('.buying-scheme__chair_selected', {
    visible: true,
  });
};

const bookSelectedSeats = async (page) => {
  await page.waitForSelector('.acceptin-button', {
    visible: true,
  });

  await Promise.all([
    page.waitForNavigation({
      waitUntil: 'domcontentloaded',
    }),
    page.click('.acceptin-button'),
  ]);
};

const isBookingButtonDisabled = async (page) => {
  await page.waitForSelector('.acceptin-button', {
    visible: true,
  });

  return page.$eval('.acceptin-button', (button) => button.disabled);
};

module.exports = {
  clickElement,
  getText,
  openSession,
  selectAvailableSeats,
  bookSelectedSeats,
  isBookingButtonDisabled,
};