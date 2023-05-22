// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      config.env.sharedSecret = process.env.NODE_ENV === "staging";

      return config;
    },
  },
});
