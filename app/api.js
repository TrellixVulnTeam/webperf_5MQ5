'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
var fs = require('fs');

module.exports = function (app) {

    //get page metrics
    app.get('/api/metrics', async function(req, res) {
            //url to test
            // const URL = 'https://www.google.com';
            const URL = req.query.URL;
            console.log(URL);

            //set up opts
            const opts = {
                logLevel: 'info',
                output: 'json',
                disableDeviceEmulation: true, //stops mobile test
                disableCpuThrottling: true,  //stops throttling
                disableNetworkThrottling: true //stops throttling
              };

              const flags = {
                chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
              }  

            //lanch browser
            const browser = await puppeteer.launch({args: flags.chromeFlags});
            const page = await browser.newPage();
            await page.goto(URL);
            const port = page.browser().wsEndpoint().split(':')[2].split('/')[0];
            opts.port = port;

            //get lhr
            const lighthouseMetrics  = await lighthouse(page.url(), opts , null);

            //write results to file
            fs.writeFile("lhr.json", JSON.stringify(lighthouseMetrics,null, 2) , function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
            const performance = JSON.stringify(lighthouseMetrics.lhr.categories.performance.score ,null,2);
            const pwa = JSON.stringify(lighthouseMetrics.lhr.categories.pwa.score ,null,2);
            const accessiblity = JSON.stringify(lighthouseMetrics.lhr.categories.accessibility.score ,null,2);
            const seo = JSON.stringify(lighthouseMetrics.lhr.categories.seo.score ,null,2);
            res.send(`Performance: ${Math.round(performance*100)}% Progressive Web App: ${Math.round(pwa*100)}% Accessibility: ${Math.round(accessiblity*100)}% SEO: ${Math.round(seo*100)}%`); 
            await browser.close();
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('/Users/eoinnewman/code/webperformance/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
