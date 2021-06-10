const express = require('express');
const router = express.Router();

const GroupService = require('./group.service');

const groupService = new GroupService();

router.get('/', async (req, res, next) => {

    try {
        let result = await groupService.findAll({
            pageNo: req.query.pageNo,
            pageSize: req.query.pageSize
        });
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.get('/:id/customer', async (req, res, next) => {

    try {
        let result = await groupService.findAllCustomers(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});



router.post('/query', async (req, res, next) => {

    try {
        let result = await groupService.findAllByQuery(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
