const Generic = require('./Generic.page');
class Register extends Generic {
    constructor() {
    super('./register')
    }
    
    get $userName () { return $('input[placeholder="Username"]'); }
    get $email () { return $('input[placeholder="Email"]'); }
    get $password () { return $('input[type="password"]'); }
    get $signUp () { return $('button*=Sign up'); }
    get $errorMessages () { return $('.error-messages li'); }

    async register ({username, email, password}) {
        await this.$userName.setValue(username);
        await this.$email.setValue(email);
        await this.$password.setValue(password);
        await this.$signUp.click();
    }

}
module.exports = Register;