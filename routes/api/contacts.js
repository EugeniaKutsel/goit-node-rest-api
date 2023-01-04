const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validation(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
