import './commands';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('showPopup is not defined')) {
    return false;
  }

  return true;
});