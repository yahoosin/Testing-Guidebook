const Reg = require('../pageObjects/Register.page');
const reg = new Reg ();
const { user1 } = require('../fixtures/users');

describe('Register Page', async ()=> {
    beforeEach(async ()=> {
        await browser.url('./register');
    });

    it.skip('should be register a new account', async ()=> {
        reg.register( {email: user1.email, password: user1.password});
        await expect(reg.$errorMessages).not.toBeExisting();
    })

    it('should error if the username is already taken', async ()=> {
        reg.register({username:'demouser', email:'demouser@learnwebdriverio.com', password: user1.password});
        await expect(await reg.$errorMessages).toHaveText(`username is already taken.`);
    })

    it('should error if email is not a valid format', async ()=> {
        reg.register({username: 'wdiouser1', email:'learnwebdriverio.com', password: user1.password});
        await expect(reg.$errorMessages).toHaveText(`email is invalid`);
    }) 
    
    it('should error if email has already been taken', async ()=> {
        reg.register({username: 'wdiouser1', email: user1.email, password: user1.password});
        await expect(reg.$errorMessages).toHaveText(`email is already taken.`);
    })

    it.skip('should take the home page once register', async ()=> {
        reg.register('wdiouser', {email: user1.email, password: user1.password});
        console.log(await browser.getUrl()); //browser.getTitle()
        await expect(reg.$errorMessages).not.toBeExisting();
    })

});