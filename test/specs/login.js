function login(email, password) {
    $('input[type="email"]').setValue(email);
    $('input[type="password"]').setValue(password);
    $('button*=Sign in').click();
    }    

describe('Login Page', function () {
    beforeEach(function () {
    browser.url('./login');
    });

    it('should let you log in', function () {
        login('demo@learnwebdriverio.com', 'wdiodemo');
        $('button*=Sign in').waitForExist({ reverse: true });
        expect($('.error-messages li')).not.toBeExisting();
    });
    

    it('should error with a missing username', function () {
        login('', 'wdiodemo');
        expect($('.error-messages li')).toHaveText(`email can't be blank`);
        });        

    it('should error with a missing password', function () {
        login('demo@learnwebdriverio.com', '');
        expect($('.error-messages li')).toHaveText(`password can't be blank`);
        });

});