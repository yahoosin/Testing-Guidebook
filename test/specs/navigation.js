const assert = require('assert');
describe('Homepage', async () => {
    it('should load properly', async () => {
        await browser.url('./');
        
        await expect(browser).toHaveTitle('Conduit');
          
        await $('=Sign in').click();
            
        await expect(browser).toHaveUrl('/login', { containing: true });

    });
});