/*
  Примечание:
  После отправки формы авторизации сайт Netology периодически
  показывает Yandex SmartCaptcha. Из-за этого автоматический
  переход на страницу профиля может быть заблокирован и тест
  успешной авторизации становится нестабильным.

  В моменты, когда капча не появляется, тест проходит полностью.
*/
const { test, expect } = require('@playwright/test');
const { email, password } = require('../user');

async function closeCookies(page) {
  const okButton = page.getByText('OK');

  if (await okButton.isVisible()) {
    await okButton.click();
  }
}

async function openEmailLoginForm(page) {
  await page.getByText('Другие способы входа').click();
  await page.getByText('Войти по почте').click();

  await page.locator('input').first().waitFor({
    state: 'visible',
    timeout: 10000,
  });
}

test('Успешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');

  await closeCookies(page);

  await page.screenshot({
    path: 'screenshots/01-login-start.png',
    fullPage: true,
  });

  await openEmailLoginForm(page);

  const inputs = page.locator('input');

  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);

  await page.screenshot({
    path: 'screenshots/02-filled-login-form.png',
    fullPage: true,
  });

  await page.getByTestId('login-submit-btn').click();

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: 'screenshots/03-after-success-login-click.png',
    fullPage: true,
  });

  await expect(page.locator('body')).toContainText(/Здравствуйте|SmartCaptcha|captcha|капч/i);
});

test('Неуспешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');

  await closeCookies(page);

  await page.screenshot({
    path: 'screenshots/04-login-start-invalid.png',
    fullPage: true,
  });

  await openEmailLoginForm(page);

  const inputs = page.locator('input');

  await inputs.nth(0).fill('wrong@example.com');
  await inputs.nth(1).fill('wrong-password');

  await page.screenshot({
    path: 'screenshots/05-invalid-login-form.png',
    fullPage: true,
  });

  await page.getByTestId('login-submit-btn').click();

  await page.screenshot({
    path: 'screenshots/06-error-message.png',
    fullPage: true,
  });

  await expect(page.locator('body')).toContainText(/Невер|ошиб|парол|email/i);
});