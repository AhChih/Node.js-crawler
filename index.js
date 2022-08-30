// const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false // 無外殼的 Chrome，有更佳的效能
  });
  
  const page = await browser.newPage();

  await page.goto('https://www.balenciaga.com/en-us/women/shoes/sneakers');
  await getData(page)
  await scrollItem(page)
})();

const scrollItem = async (page) => {
    pageHeight = await page.evaluate('document.body.scrollHeight')
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)',
    await page.waitForFunction(`document.body.scrollHeight > ${pageHeight}`),
    await getData(page)
  )
}

const getData = async (page) => {
  let body = await page.content()
  let $ = await cheerio.load(body)
  const data = []
  const list = $(".l-productgrid__item .c-product__infos");
      for (let i = 0; i < list.length; i++) {
          const title = list.eq(i).find('.c-product__infos h2').text();
          const price = list.eq(i).find('.c-product__infos p').text().trim();
          data.push({ title, price });
      }
      data.forEach((res, i) => {
        console.log(`${i+1} 名稱: ${res.title}, 價錢: ${res.price}`)
      })
  await scrollItem(page)
}