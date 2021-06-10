const express = require('express');
const router = express.Router();

const NotificationService = require('./notification.service');

const notificationService = new NotificationService();



router.get('/:id/translations', async (req, res, next) => {

    try {
        let result = await notificationService.findByIdAndTransltaions(req.params.id);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});



router.post('/', async (req, res, next) => {

    try {
        let result = await notificationService.create(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.post('/send/customer', async (req, res, next) => {

    try {
        let result = await notificationService.sendToCustomer(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

router.post('/send/group', async (req, res, next) => {

    try {
        let result = await notificationService.sendToGroup(req.body);
        return res.json(result);
    } catch (err) {
        next(err);
    }

});


module.exports = router;
