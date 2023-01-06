const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const { auth: ctrl } = require('../../controllers');

router.post('/signup', validation(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authenticate, validation(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;