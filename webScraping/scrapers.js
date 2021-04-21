const puppeteer = require('puppeteer');

async function scrapeProduct(url) {

    const  browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: 'networkidle2', timeout: 0});

    const [el2] = await page.$x('//*[@id="root"]/div[7]/div[1]/div/div[1]/div[2]/div[3]/div[2]');
    const txt = await el2.getProperty('textContent');

    const txtRes = await txt.jsonValue();

    console.log(txtRes)

    browser.close();
}

//scrapeProduct('https://www.spar.at/aktionen/steiermark/spar/flugblatt-kw-14?p=1');

scrapeProduct('https://www.aktionsfinder.at/suche/?sort=score%2Cdesc&distance=10000&q=bier%20graz&vendor=-spar')


// Regex: get date: ((?:\d{2}\.\d{2}\. - \d{2}\.\d{2}\.\d{2}))

