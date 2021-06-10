const Joi = require('@hapi/joi');

const {
    CustomerRepository,
    LanguageRepository
} = require('../../../../common/repository');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class CustomerService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.customerRepository = new CustomerRepository();
        this.languageRepository = new LanguageRepository();
    }

    async findAll({ pageNo, pageSize }) {


        let customers = await this.customerRepository.findAll({
            pageNo: pageNo,
            pageSize: pageSize
        });

        return customers;
    }

    async findById(id) {
        let customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }

        return customer;
    }

    async findAllByQuery(query) {

        let { error, value } = this.restQueryBuilder.build(query);

        if (error) {
            throw new BadInputError(null, error);
        }

        let customers = await this.customerRepository.findAll(value);

        return customers;
    }

    async create(customer) {
        let { error, value } = validateCustomer(customer);

        if (error) {
            throw new BadInputError(null, error);
        }

        let language = await this.languageRepository.findById(value.languageId);

        if (!language) {
            throw new ResourceNotFoundError(`[languageId:${value.languageId}] does not exist`);
        }

        let isUniqueByEmail = await this.customerRepository.isUniqueByEmail(value.email);

        if (!isUniqueByEmail) {
            throw new ResourceAlreadyExistsError(`[email:${value.email}] already exists`);
        }

        let isUniqueByContact = await this.customerRepository.isUniqueByContact(value.contact);

        if (!isUniqueByContact) {
            throw new ResourceAlreadyExistsError(`[contact:${value.contact}] already exists`);
        }

        let result = await this.customerRepository.create(value);

        return result;
    }

    async update(id, customer) {
        let { error, value } = validateCustomer(customer);

        if (error) {
            throw new BadInputError(null, error);
        }

        let result = await this.customerRepository.findById(id);

        if (!result) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }

        if (result.languageId != value.languageId) {
            let language = await this.languageRepository.findById(value.languageId);

            if (!language) {
                throw new ResourceNotFoundError(`[languageId:${value.languageId}] does not exist`);
            }
        }

        let isUniqueByEmail = await this.customerRepository.isUniqueByEmail(value.email, id);

        if (!isUniqueByEmail) {
            throw new ResourceAlreadyExistsError(`[email:${value.email}] already exists`);
        }

        let isUniqueByContact = await this.customerRepository.isUniqueByContact(value.contact, id);

        if (!isUniqueByContact) {
            throw new ResourceAlreadyExistsError(`[contact:${value.contact}] already exists`);
        }

        let updatedcustomer = await this.customerRepository.update(result.id, value);

        return updatedcustomer;
    }

    async delete(id) {
        let customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new ResourceNotFoundError(`[id:${id}] does not exist`);
        }


        let deletedcustomer = await this.customerRepository.delete(id);

        return deletedcustomer;
    }

}

function validateCustomer(customer) {
    let schema = Joi.object({
        name: Joi.string().trim().max(255).required(),
        languageId: Joi.number().integer().required(),
        contact: Joi.string().required(),
        email: Joi.string().email().required()
    });

    return schema.validate(customer);
}



module.exports = CustomerService;