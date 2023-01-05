const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const { contacts: ctrl } = require('../../controllers');

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', authenticate, validation(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authenticate, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
