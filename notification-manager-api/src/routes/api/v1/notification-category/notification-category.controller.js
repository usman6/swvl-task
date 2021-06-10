const express = require('express');
const router = express.Router();

const NotificationCategoryService = require('./notification-category.service');

const notificationCategoryService = new NotificationCategoryService();

router.get('/', async (req, res, next) => {

    try {
        let result = await notificationCategoryService.findAll({
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
        let result = await notificationCategoryService.findAllByQuery(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
