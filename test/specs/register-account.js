const Auth = require('../pageObjects/Auth.page');

const auth = new Auth();

describe('Register Page', function () {
    beforeEach(function () {
    browser.url('./register');
    });

    it.only('should be register a new account', function () {
        var timestamp = Date.now();
        auth.register('wdiouser', 'register@learnwebdriverio.com', 'wdiopass');
        expect(auth.$errorMessages).not.toBeExisting();
        console.log(timestamp);
    })

    it('should error if the username is already taken', function () {
        auth.register('wdiouser', 'wdiouser1@learnwebdriverio.com', 'wdiopass');
        expect(auth.$errorMessages).toHaveText(`username is already taken`);
    })

    it('should error if email is not a valid format', function () {
        auth.register('wdiouser1', 'learnwebdriverio.com', 'wdiopass');
        expect(auth.$errorMessages).toHaveText(`email is invalid`);
    }) 
    
    it('should error if email has already been taken', function () {
        auth.register('wdiouser1', 'wdiouser@learnwebdriverio.com', 'wdiopass');
        expect(auth.$errorMessages).toHaveText(`username is already taken`);
    })

    it.skip('should take the home page once register', function () {
        auth.register('wdiouser', 'register@learnwebdriverio.com', 'wdiopass');
        expect(auth.$errorMessages).not.toBeExisting();
    })

});