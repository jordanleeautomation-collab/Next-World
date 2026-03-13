const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://morningside.ai/', { waitUntil: 'networkidle0' });
    
    // Evaluate the page content in the context of the browser
    const testimonialsHTML = await page.evaluate(() => {
        // Look for the specific header text
        const headings = Array.from(document.querySelectorAll('h2, h3'));
        const targetHeading = headings.find(h => h.textContent.includes('Don’t just take our word for it'));
        
        if (targetHeading) {
            // Find the closest parent section or container div
            let container = targetHeading.closest('section');
            if (!container) {
                // If not a <section>, find a wrapping div that isn't the body
                let parent = targetHeading.parentElement;
                while (parent && parent.tagName !== 'BODY' && !parent.classList.contains('section')) {
                     parent = parent.parentElement;
                }
                container = parent;
            }
            return container ? container.outerHTML : null;
        }
        return null;
    });

    if (testimonialsHTML) {
        fs.writeFileSync('/Users/jordy/JordanLeeAI/apps/morningside-clone/missing_section.html', testimonialsHTML);
        console.log('Successfully extracted rendered Testimonials HTML');
    } else {
        console.log('Could not find the Testimonials section in the rendered DOM');
    }

    await browser.close();
})();
