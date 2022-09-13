const Generic = require('./Generic.page');
class Auth extends Generic {
    constructor() {
    super('./login')
    }   

    get $email () { return $('input[type="email"]'); }
    get $password () { return $('input[type="password"]'); }
    get $signIn () { return $('button*=Sign in'); }
    get $errorMessages () { return $('.error-messages li'); }
    get $userName () { return $('input[placeholder="Username"]'); }
    get $registerEmail () { return $('input[placeholder="Email"]'); }
    //get $registerLink () { return $('[text-xs-center]a')};
    get $signUp () { return $('button*=Sign up'); }

    
    login ({email, password}) {
        this.$email.setValue(email);
        this.$password.setValue(password);
        this.$signIn.click();

        browser.waitUntil(
            () => {
            const signInExists = this.$signIn.isExisting();
            const errorExists = this.$errorMessages.isExisting();
            return !signInExists || errorExists;
            },
            {
            timoutMsg:
            'The "Sign in" button still exists and an error never appeared'
            });
    }

    register ({username, email, password}) {
        this.$userName.setValue(username);
        this.$registerEmail.setValue(email);
        this.$password.setValue(password);
        this.$signUp.click();

        browser.waitUntil(
            () => {
            const signUpExists = this.$signUp.isExisting();
            const errorExists = this.$errorMessages.isExisting();
            return !signUpExists || errorExists;
            },
            {
            timoutMsg:
            'The "Sign up" button still exists'
            });
    }

}

module.exports = Auth;