const puppeteer = require('puppeteer');
const { Given, When, Then, After, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');

const {
  openSession,
  selectAvailableSeats,
  bookSelectedSeats,
  isBookingButtonDisabled,
  getText,
} = require('../../lib/commands');

const appUrl = 'https://qamid.tmweb.ru/client/index.php';

let browser;
let page;

setDefaultTimeout(40000);

Given('пользователь открыл главную страницу кинотеатра', async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  page = await browser.newPage();

  await page.goto(appUrl, {
    waitUntil: 'domcontentloaded',
  });
});

When('пользователь открывает доступный сеанс', async () => {
  await openSession(page);
});

When('пользователь выбирает {int} место', async (count) => {
  await selectAvailableSeats(page, count);
});

When('пользователь выбирает {int} места', async (count) => {
  await selectAvailableSeats(page, count);
});

When('пользователь бронирует выбранные места', async () => {
  await bookSelectedSeats(page);
});

Then('пользователь видит подтверждение бронирования', async () => {
  const title = await getText(page, '.ticket__check-title');

  expect(title).to.contain('Вы выбрали билеты');
});

Then('пользователь видит информацию о выбранных местах', async () => {
  const seats = await getText(page, '.ticket__chairs');

  expect(seats.length).to.be.greaterThan(0);
});

Then('кнопка бронирования неактивна', async () => {
  const isDisabled = await isBookingButtonDisabled(page);

  expect(isDisabled).to.equal(true);
});

After(async () => {
  if (page) {
    await page.close();
  }

  if (browser) {
    await browser.close();
  }
});