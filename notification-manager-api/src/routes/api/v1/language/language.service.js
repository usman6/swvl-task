const Joi = require('@hapi/joi');

const {
    LanguageRepository
} = require('../../../../common/repository');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class LanguageService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.languageRepository = new LanguageRepository();
    }

    async findAll({ pageNo, pageSize }) {

        let languages = await this.languageRepository.findAll({
            pageNo: pageNo,
            pageSize: pageSize
        });

        return languages;
    }

    async findById(id) {
        let language = await this.languageRepository.findById(id);

        if (!language) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }

        return language;
    }

    async findAllByQuery(query, tenantId) {

        let { error, value } = this.restQueryBuilder.build(query);

        if (error) {
            throw new BadInputError(null, error);
        }

        let languages = await this.languageRepository.findAll(value);

        return languages;
    }

    async create(language) {
        let { error, value } = validateLanguage(language);

        if (error) {
            throw new BadInputError(null, error);
        }

        let isUnique = await this.languageRepository.isUniqueByCode(value.code);

        if (!isUnique) {
            throw new ResourceAlreadyExistsError(`[code:${value.code}] already exists`);
        }
        let result = await this.languageRepository.create(value);

        return result;
    }

    async update(id, language) {
        let { error, value } = validateLanguage(language);

        if (error) {
            throw new BadInputError(null, error);
        }

        let exists = await this.languageRepository.findById(id);

        if (!exists) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }

        let isUniqueCode = await this.languageRepository.isUniqueByCode(value.code, id);

        if (!isUniqueCode) {
            throw new ResourceAlreadyExistsError(`[code:${value.code}] already exists`);
        }


        let result = await this.languageRepository.update(id, value);

        return result;
    }

    async delete(id) {

        let language = await this.languageRepository.findById(id);

        if (!language) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }

        let result = await this.languageRepository.delete(id);

        return result;
    }

}

function validateLanguage(language) {
    let schema = Joi.object({
        code: Joi.string().trim().max(255).required(),
        displayName: Joi.string().trim().max(255).allow('', null)
    });

    return schema.validate(language);
}

module.exports = LanguageService;