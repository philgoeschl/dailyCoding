const puppeteer = require('puppeteer');

async function scrapeProduct(url) {

    const  browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imageUrl = await src.jsonValue();


    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="price_inside_buybox"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imageUrl, title,price});

    browser.close();
}

scrapeProduct('https://www.amazon.de/dp/B084DWG2VQ/ref=gw_de_desk_h1_aucc_brw_qh_kif6_noprice?pf_rd_r=NPGYZ4D01GF2BTJ2T3QJ&pf_rd_p=8b615447-2a6a-4d7b-9a0e-1cfaa951af14')