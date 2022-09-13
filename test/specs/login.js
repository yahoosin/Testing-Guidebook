const Auth = require('../pageObjects/Auth.page');
const auth = new Auth();
const { user1 } = require('../fixtures/users');

describe('Login Page', function () {
    beforeEach(function () {
    browser.url('./login');
});

    it('should let you log in', function () {
    auth.login(user1);
    expect(auth.$errorMessages).not.toBeExisting();
    });

    it('should error with a missing username', function () {
    auth.login({email: '', password:user1.password});
    expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    });

    it('should error with a missing password', function () {
    auth.login({email: user1.email, password: ''});
    expect(auth.$errorMessages).toHaveText(`password can't be blank`);
     });      

});