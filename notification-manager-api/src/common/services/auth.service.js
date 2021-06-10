const jwt = require('jsonwebtoken');
const request = require('request-promise-native');

const { UnauthorizedError } = require('../../core');

const { IDENTITY_URL } = require('../../config/environment');

class AuthService {

    constructor() {

    }

    async authenticate(token) {

        try {

            if (!token) {
                throw new UnauthorizedError();
            }

            let payload = jwt.decode(token);

            let certificate = await this.getCertificate(payload.tenantName);

            if (!certificate) {
                throw new UnauthorizedError();
            }

            let result = jwt.verify(token, certificate.publicKey);

            return result;

        } catch (err) {
            throw new UnauthorizedError();
        }

    }

    async getCertificate(tenantName) {
        try {
            let certificate = await request.get(`${IDENTITY_URL}/api/v2/certificates/public?tenant=${tenantName}`, {
                json: true
            });
            return certificate;
        } catch (err) {
            return null;
        }
    }
}

module.exports = AuthService;