const puppeteer = require('puppeteer');

const PROFILE_URL = 'https://www.instagram.com/lifeof_phl/'



async function scrapeProfile(profileUrl, imageXPath) {

    const  browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(profileUrl);

    const [el] = await page.$x(imageXPath);
    const src = await el.getProperty('src');
    const imageUrl = await src.jsonValue();

    console.log({imageUrl});

    browser.close();
}

scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[1]/div[1]/a/div/div[1]/img');
scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[1]/div[2]/a/div/div[1]/img');
scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[1]/div[3]/a/div/div[1]/img');
scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[2]/div[1]/a/div/div[1]/img');
scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[2]/div[2]/a/div/div[1]/img');
scrapeProfile(PROFILE_URL,'//*[@id="react-root"]/section/main/div/div[3]/article/div[1]/div/div[2]/div[3]/a/div/div[1]/img');
