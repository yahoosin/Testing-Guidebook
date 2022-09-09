const Auth = require('../pageObjects/Auth.page');

const auth = new Auth();

describe('Login Page', function () {
    beforeEach(function () {
    browser.url('./login');
    });

    it('should let you log in', function () {
    auth.login('demo@learnwebdriverio.com', 'wdiodemo');
    expect(auth.$errorMessages).not.toBeExisting();
    });

    it('should error with a missing username', function () {
    auth.login('', 'wdiodemo');
    expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    });

    it('should error with a missing password', function () {
    auth.login('demo@learnwebdriverio.com', '');
    expect(auth.$errorMessages).toHaveText(`password can't be blank`);
     });      

});