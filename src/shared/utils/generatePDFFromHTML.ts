import * as puppeteer from 'puppeteer';

export const generatePDFFromHTML = async (template: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--hide-scrollbars',
        '--disable-gpu',
        '--mute-audio',
        '--disable-dev-shm-usage',
      ],
    });
    const page = await browser.newPage();
    await page.setContent(template);

    // Add viewport for better rendering
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    });

    const pdf = await page.pdf({
      format: 'LETTER',
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px',
      },
      preferCSSPageSize: true,
    });
    await browser.close();
    return pdf;
  } catch (error) {
    throw error;
  }
};
