const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    page.setBypassCSP(true);//设置绕过同源策略
    await page.goto('http://www.baidu.com')
    _input=await page.$('#kw');
    await page.$eval('#kw', el => el.value='hello world');
    await page.click('#su');
    await page.screenshot({
        path: 'c:/temp/baidu.png'
    })
})()
