const Auth = require('../pageObjects/Auth.page');
const auth = new Auth();
const { user1 } = require('../fixtures/users');

describe('Register Page', function () {
    beforeEach(function () {
        browser.url('./login');
    });

    beforeEach(function () {
        browser.url('./register');
    });

    it('should be register a new account', function () {
        //var timestamp = Date.now();
        auth.register( {email: user1.email, password: user1.password});
        expect(auth.$errorMessages).not.toBeExisting();
        //console.log(timestamp);
    })

    it('should error if the username is already taken', function () {
        auth.register('wdiouser', {email: user1.email, password: user1.password});
        expect(auth.$errorMessages).toHaveText(`username is already taken`);
    })

    it('should error if email is not a valid format', function () {
        auth.register('wdiouser1', 'learnwebdriverio.com', {password: user1.password});
        expect(auth.$errorMessages).toHaveText(`email is invalid`);
    }) 
    
    it('should error if email has already been taken', function () {
        auth.register('wdiouser1', {email: user1.email, password: user1.password});
        expect(auth.$errorMessages).toHaveText(`username is already taken`);
    })

    //pending
    it.skip('should take the home page once register', function () {
        auth.register('wdiouser', {email: user1.email, password: user1.password});
        expect(auth.$errorMessages).not.toBeExisting();
    })

});