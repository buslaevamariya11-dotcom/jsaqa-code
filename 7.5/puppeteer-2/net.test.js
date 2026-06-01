const {
  openSession,
  selectAvailableSeats,
  bookSelectedSeats,
  isBookingButtonDisabled,
  getText,
} = require('./lib/commands');

const appUrl = 'https://qamid.tmweb.ru/client/index.php';

let page;

beforeEach(async () => {
  page = await browser.newPage();

  await page.goto(appUrl, {
    waitUntil: 'domcontentloaded',
  });
});

afterEach(async () => {
  await page.close();
});

describe('Ticket booking tests', () => {
  test(
    'Happy path: should book one available seat',
    async () => {
      // Arrange
      await openSession(page);

      // Act
      await selectAvailableSeats(page, 1);
      await bookSelectedSeats(page);

      // Assert
      const title = await getText(page, '.ticket__check-title');

      expect(title).toContain('Вы выбрали билеты');
    },
    40000
  );

  test(
    'Happy path: should book two available seats',
    async () => {
      // Arrange
      await openSession(page);

      // Act
      await selectAvailableSeats(page, 2);
      await bookSelectedSeats(page);

      // Assert
      const title = await getText(page, '.ticket__check-title');
      const seats = await getText(page, '.ticket__chairs');

      expect(title).toContain('Вы выбрали билеты');
      expect(seats.length).toBeGreaterThan(0);
    },
    40000
  );

  test(
    'Sad path: should not allow booking without selected seats',
    async () => {
      // Arrange
      await openSession(page);

      // Act
      const isDisabled = await isBookingButtonDisabled(page);

      // Assert
      expect(isDisabled).toBe(true);
    },
    40000
  );
});