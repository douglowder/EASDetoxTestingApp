const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

const sleepAsync = (t) => new Promise((res) => setTimeout(res, t));

const wd = process.cwd();

describe('App', () => {
  it('launching app normally hides our element behind dev launcher', async () => {
    await device.launchApp({
      delete: true,
    });
    await sleepAsync(3000);
    await expect(element(by.id('hello'))).not.toBeVisible();
  });

  it('launching app with regular packager URL hides our element behind dev menu and onboarding popup', async () => {
    const platform = device.getPlatform();
    await device.launchApp({
      delete: true,
    });
    exec(`${wd}/e2e/deep-link.sh ${platform} 0`);
    await sleepAsync(3000);
    await expect(element(by.id('hello'))).not.toBeVisible();
  });

  it('launching app with disable onboarding URL hides dev menu and shows our element', async () => {
    const platform = device.getPlatform();
    await device.launchApp({
      delete: true,
    });
    await sleepAsync(2000);
    exec(`${wd}/e2e/deep-link.sh ${platform} 1`);
    await sleepAsync(3000);
    await expect(element(by.id('hello'))).toBeVisible();
  });

  afterAll(async () => {
    await device.uninstallApp();
  });
});
