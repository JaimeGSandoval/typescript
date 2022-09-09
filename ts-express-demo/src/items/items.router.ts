/**
 * Required External Modules and Interfaces
 */

// Here, you are importing the express package and two of its internal type definitions, Request and Response, which you can use to type the callback functions of your Express controllers.
import express, { Request, Response } from 'express';
// You also import all the exported functions from the items.service module and bundle them locally as an ItemService object, making it easier for you to avoid name collisions and to pinpoint from what package a function comes.
import * as ItemService from './items.service';
// Finally, you also import the Item and Items interfaces, which are necessary to type the return values from the ItemService functions.
import { BaseItem, Item } from './item.interface';

/**
 * Router Definition
 */
// Here, you use the express.Router class to create a modular and mountable bundle of route handlers. An Express router instance is often referred to as a "mini-app" because it functions as a complete middleware and routing system, which is essential for organizing the architecture of your Node.js project into components that you can easily test and re-use.
// You export the itemsRouter right away, even though you have not defined its routing properties yet. Any property that you define later in the module on the itemsRouter object would be accessible by any module that imports it.
export const itemsRouter = express.Router();
/**
 * Controller Definitions
 */

// The logic of the controllers is compact as they delegate the bulk of their operations to the functions of the ItemService module. If you ever need to use a database like MongoDB or PostgreSQL to persist data, you only need to modify the logic of the service provider, the ItemService module, and not the logic of the consumers, your controllers.

// GET items
itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send('Item not found');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items
itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem: Item = await ItemService.create(item);

    return res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

// PUT items/:id
itemsRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body;

    const existingItem: Item = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);

    await ItemService.remove(id);

    res.status(204).send('Item deleted');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
