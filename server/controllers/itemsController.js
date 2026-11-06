import Item from '../models/Item.js'

const getItems = async ( req, res, next ) => {
    try { 
      const items = await Item.find({})
      if (!items) {
        const err = new Error('failed to fetch items from db')
        err.status = 400
        throw err
      }

      res.status(200).json(items)
    } catch (err) {
      next(err)
    }
}

const createItem = async ( req, res, next) => {
  try { 
    const newItem = req.body
    const item = await Item.create(newItem)
    res.status(201).json(item)

  } catch (err){
    next(err)
  }
}

const updateItem = async ( req, res, next ) => {
  try {
    const newItem = req.body
    const id = req.params.id

    const item = await Item.findById(id)

    if (!item || !id) {
      const err = new Error('item not found or id missing')
      err.status = 400
      throw err
    }

    Object.assign(item, newItem)
    await item.save()

    res.status(200).json(item)

  } catch (err) {
    next(err)
  }
}

const deleteItem = async ( req, res, next ) => {
  try {
    const id = req.params.id
    const item = await Item.findByIdAndDelete(id)

    if (!id || !item) {
      const err = new Error('Item not found or invalid id')
      err.status = 400
      throw err
    } 
    res.status(200).send()
  } catch (err) {
    next(err)
  }
}

export {getItems, createItem, updateItem, deleteItem}