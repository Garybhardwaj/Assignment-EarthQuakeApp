const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');
// To start the project 
Given(/^starting Earthquake analysis app$/, () => {
  return client
    .url('http://localhost:4200');
});
// to test the title of Page is as expected
Then(/^the title of Dashboard page is "(.*?)"$/, (text) => {
  return client.assert.title(text);
});
// To test click event of list item 
Then(/^the Dashboard page is rendered$/, () => {
  return client
  .waitForElementVisible('div[id="listitem0"]',40000)
  .assert.visible('div[id="listitem0"]')
  .click('div[id="listitem0"]')
  .waitForElementVisible('img[src="http://localhost:4200/assets/marker-icon.png"]',40000)
  .assert.visible('img[src="http://localhost:4200/assets/marker-icon.png]');
});



