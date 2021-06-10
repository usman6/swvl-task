const express = require('express');
const router = express.Router();

const LanguageService = require('./language.service');

const languageService = new LanguageService();

router.get('/', async (req, res, next) => {

    try {
        let result = await languageService.findAll({
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
        let result = await languageService.findById(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {

    try {
        let result = await languageService.create(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.post('/query', async (req, res, next) => {

    try {
        let result = await languageService.findAllByQuery(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


router.put('/:id', async (req, res, next) => {

    try {
        let result = await languageService.update(req.params.id, req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.delete('/:id', async (req, res, next) => {

    try {
        let result = await languageService.delete(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
