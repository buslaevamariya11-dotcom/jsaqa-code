import './commands';

Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    'showPopup is not defined',
    'chairChecked is not defined',
    'startSales is not defined',
  ];

  return !ignoredErrors.some((message) => err.message.includes(message));
});