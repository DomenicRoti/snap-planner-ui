// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    const email = Math.random().toString(36).slice(2) + '@gmail.com'

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
    console.log('Redirect to login page since your not logged in.')
    browser.assert.urlEquals(browser.globals.devServerURL + '/login?redirect=%2F')
    browser.click('[data-test-variable="register"]', () => {
      console.log('.click register button')
    })
    .pause(200)
    .setValue('input#email', email, () => {
      console.log('email entered')
    })
    .pause(200)
    .setValue('input#password', '123456', () => {
      console.log('password entered')
    })
    .pause(200)
    .setValue('input#password-confirm', '123456', () => {
      console.log('confirm password entered')
    })
    .pause(200)
    .submitForm('form', () => {
      console.log('Register form successful submit')
    })
    .assert.urlEquals(browser.globals.devServerURL)
    .end
  }
}
