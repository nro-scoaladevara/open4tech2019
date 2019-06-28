import Item from './item.model';

export default app => {
  /* CREATE Item for a specific List */
  app.post('/api/lists/:listId/items', (request, response, next) => {
    const item = new Item({
      description: request.body.description,
      list: request.params.listId
    });
    Item.create(item)
      .then(createdItem => response.json(createdItem))
      .catch(error => next(error));
  });

  /* READ Item */
  app.get('/api/items/:itemId', (request, response, next) => {
    Item.findOne({ _id: request.params.itemId })
      .then(foundItem => response.json(foundItem))
      .catch(error => next(error));
  });

  /* UPDATE Item */
  app.put('/api/items/:itemId', (request, response, next) => {
    const itemUpdate = {
      description: request.body.description
    };
    Item.findOneAndUpdate(
      { _id: request.params.itemId },
      itemUpdate,
      { new: true, runValidators: true }
    )
      .then(updatedItem => response.json(updatedItem))
      .catch(error => next(error));
  });

  /* DELETE Item */
  app.delete('/api/items/:itemId', (request, response, next) => {
    Item.findOneAndDelete({ _id: request.params.itemId })
      .then(deletedItem => response.json(deletedItem))
      .catch(error => next(error));
  });
};
