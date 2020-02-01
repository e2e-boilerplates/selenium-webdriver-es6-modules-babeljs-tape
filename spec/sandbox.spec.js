const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const test = require("tape");

require("chromedriver");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

let browser;

test("setup", async t => {
  setTimeout(() => {
    browser = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://e2e-boilerplates.github.io/sandbox/");
    t.end();
  }, 2000);
});

test("Should be on Sandbox", async t => {
  const title = await browser.getTitle();
  const header = await browser.findElement(By.css("h1")).getText();

  t.equal(title, "Sandbox");
  t.equal(header, "Sandbox");
  t.end();
});

test("teardown", async t => {
  browser.quit();
  t.end();
});
