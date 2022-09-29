const Auth = require('../pageObjects/Auth.page');
const auth = new Auth();
const { user1 } = require('../fixtures/users');

describe('Login Page', async ()=> {
    beforeEach(async ()=> {
        await browser.url('./login');
    });

    it('should let you log in', async ()=> {
        await auth.login(user1);
        await expect(auth.$errorMessages).not.toBeExisting();
    });

    it('should error with a missing username', async ()=> {
        await auth.login({email: '', password:user1.password});
        await expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    });

    it('should error with a missing password', async ()=> {
        await auth.login({email: user1.email, password: ''});
        await expect(auth.$errorMessages).toHaveText(`password can't be blank`);
     });      

});