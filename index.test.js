const chai = require('chai');
const Models = require('.');

describe('Model Validation', () => {
    describe('user model', () => {
        const User = Models.User;

        it('should not validate if neither email address nor mobile number is specified', (done) => {
            const user = new User({});
            user.validate((err) => {
                chai.expect(err).to.exist;
                done();
            });
        });

        it('should not validate if name or password missing', (done) => {
            const user = new User({email: "a@b.com"});
            user.validate((err) => {
                chai.expect(err.errors.name).to.exist;
                chai.expect(err.errors.password).to.exist;
                done();
            });
        });

        it('should not validate if email is invalid, mobile no. is not 10 digits, or name is blank', (done) => {
            const user = new User({email: "a@b", mobile_number: "111", name: ""});
            user.validate((err) => {
                chai.expect(err.errors.email).to.exist;
                chai.expect(err.errors.mobile_number).to.exist;
                chai.expect(err.errors.name).to.exist;
                done();
            });
        });

        it('should validate if a valid email, non-empty name, and password are specified', (done) => {
            const user = new User({email: "a@b.com", name: "Anirudh", password: "Password"});
            user.validate((err) => {
                chai.expect(err).to.not.exist;
                done();
            });
        });

        it('should validate if 10-digit mobile number, non-empty name, and password are specified', (done) => {
            const user = new User({mobile_number: "9999999999", name: "Anirudh", password: "Password"});
            user.validate((err) => {
                chai.expect(err).to.not.exist;
                done();
            });
        });
    });
});
