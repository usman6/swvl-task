const jwt = require('jsonwebtoken');

const { CustomerCertificateRepository } = require('./../repository');
const { UnauthorizedError } = require('../../core');

class AuthService {

    constructor() {
        this.customerCertificateRepository = new CustomerCertificateRepository();
    }

    async authenticate(token) {

        if (!token) {
            throw new UnauthorizedError();
        }

        let certificate = await this.customerCertificateRepository.findLatest();
        try {
            let result = jwt.verify(token, certificate.publicKey);
            return result;
        } catch (err) {
            throw new UnauthorizedError();
        }

    }
}

module.exports = AuthService;