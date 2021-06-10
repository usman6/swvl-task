const express = require('express');
const router = express.Router();

const CustomerService = require('./customer.service');

const customerService = new CustomerService();

router.get('/', async (req, res, next) => {

    try {
        let result = await customerService.findAll({
            pageNo: req.query.pageNo,
            pageSize: req.query.pageSize
        });
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.get('/:id', async (req, res, next) => {

    try {
        let result = await customerService.findById(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {

        try {
            let result = await customerService.create(req.body);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    
    });

router.post('/query', async (req, res, next) => {

    try {
        let result = await customerService.findAllByQuery(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


router.put('/:id', async (req, res, next) => {

    try {
        let result = await customerService.update(req.params.id, req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.delete('/:id', async (req, res, next) => {

    try {
        let result = await customerService.delete(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
