const puppeteer = require('puppeteer');
const config = require ('./config');

async function saySorry() {

    const browser = await puppeteer.launch({
        headless: false
    });

    const whatsappPage = await browser.newPage();
    await whatsappPage.goto("https://web.whatsapp.com/");
    
    // You need to make sure your whatsApp application is on 
    // and you are ready to scan the QR code, 
    await whatsappPage.waitForNavigation();

    const GF_XPATH = `//*[@id="pane-side"]//span/span[contains(text(), '${config.GF_NAME}')]`;
    const gfElement = await whatsappPage.$x(GF_XPATH);
    await gfElement[0].click();

    const TYPE_AREA_XPATH = '//*[@id="main"]/footer//div[contains(text(), "Type a message")]';
    const typeElement = await whatsappPage.$x(TYPE_AREA_XPATH);
    await typeElement[0].click();

    // Let the script apologise for you, cause galti tumhare hi hai !
    // Kyun krte ho itne kaand, jo loop chalana padh raha hai ? 
    for (let i = 0; i < config.REPEAT; i++) {
        await typeElement[0].type(config.MESSAGE);
        await typeElement[0].type(String.fromCharCode(13));
    }
}

saySorry();
