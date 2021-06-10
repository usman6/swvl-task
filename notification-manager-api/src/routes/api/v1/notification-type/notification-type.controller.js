const express = require('express');
const router = express.Router();

const NotificationTypeService = require('./notification-type.service');

const notificationTypeService = new NotificationTypeService();

router.get('/', async (req, res, next) => {

    try {
        let result = await notificationTypeService.findAll({
            pageNo: req.query.pageNo,
            pageSize: req.query.pageSize
        });
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


router.post('/query', async (req, res, next) => {

    try {
        let result = await notificationTypeService.findAllByQuery(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
