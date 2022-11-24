const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    baseUrl: 'https://buger-eats.vercel.app'
  },
});
