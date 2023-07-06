const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity": false,
  env: {
    username: 'hiddenuser1927',
    password: '01100110'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  
  //"experimentalSessionAndOrigin": true
  
});
