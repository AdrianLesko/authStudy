import express from 'express'
const router = express.Router()

import { getItems, updateItem, createItem, deleteItem } from '../controllers/itemsController.js'

router.get('/', getItems)
  .post('/', createItem)
  .patch('/:id', updateItem)
  .delete('/:id', deleteItem)

export default router