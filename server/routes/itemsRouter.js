import express from 'express'
const router = express.Router()
import { verifyToken } from '../middleware/auth.middleware.js'

import { getItems, updateItem, createItem, deleteItem } from '../controllers/itemsController.js'

router.get('/', getItems)
  .post('/', verifyToken, createItem)
  .patch('/:id',verifyToken, updateItem)
  .delete('/:id',verifyToken, deleteItem)

export default router