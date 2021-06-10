const jwt = require('jsonwebtoken');
const axios = require('axios');

const { IntegrationRepository } = require('../repository');
const { UnauthorizedError, Logger } = require('../../core');

class CoreAuthService {

    constructor() {
        this.integrationRepository = new IntegrationRepository();
    }

    async getToken(tenantId, integrationTypeName = 'CORE_PLATFORM') {
        try {

            let integration = await this.integrationRepository.findByIntegrationTypeName(tenantId, integrationTypeName);

            if (!integration) {
                throw new UnauthorizedError();
            }

            let token = await this.fetchToken(integration.url, integration.accessKey, integration.secretKey);

            return token;
        }
        catch (e) {
            Logger.error(e);
            throw new UnauthorizedError();
        }

    }

    async fetchToken(url, accessKey, secretKey) {

        try {
            let result = await axios.post(url, {
                accessKey: accessKey,
                secretKey: secretKey
            });

            if (result.status != 200) {
                throw new UnauthorizedError();
            }

            return result.data.token;
        }
        catch (e) {
            Logger.error(e);
            throw new UnauthorizedError();
        }
    }
}

module.exports = CoreAuthService;