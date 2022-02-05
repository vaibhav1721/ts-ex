/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";
 import * as ItemService from "./items.service";
 import { BaseItem, Item } from "./item.interface";
import { text } from "stream/consumers";

/**
 * Router Definition
 */

 export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */


// GET items


itemsRouter.get('/',async(req : Request, res : Response) =>{
    try{
        const items : Item[] = await ItemService.findAll();
        res.status(200).send(items);
    }catch (e: any){
        res.status(500).send(e.message) ;
    }
})

// GET items/:id

itemsRouter.get('/:id',async (req:Request, res : Response) => {
    const id : number = parseInt(req.params.id, 10);
    try{
        const item : Item = await ItemService.find(id);
        res.status(200).send(item);
    }catch(e : any){
        res.status(500).send(e.message);
    } 
})

// POST items

itemsRouter.post('/',async (req:Request, res:Response) => {
    const item: BaseItem = req.body;
    try{
        const newItem = await ItemService.create(item);
        res.status(201).send(newItem);
    }catch(e : any){
        res.status(500).send(e.message);
    } 
})

// PUT items/:id

itemsRouter.put('/:id',async (req:Request, res:Response) => {
    const item: Item     = req.body;
    const id : number    = parseInt(req.params.id, 10);

    try{
        const existingItem : Item = await ItemService.find(id);

        if (existingItem) {
            const updatedItem = await ItemService.update(id, item);
            return res.status(200).json(updatedItem);
          }

        const newItem = await ItemService.create(item);
      
        res.status(201).send(existingItem);
    }catch(e : any){
        res.status(500).send(e.message);
    } 
})

// DELETE items/:id

itemsRouter.delete('/:id',async (req:Request , res:Response) => {
    const id : number    = parseInt(req.params.id, 10);
    try{
        const item : void|null = await ItemService.remove(id);  
        return res.sendStatus(204);
    }catch(e : any){
        res.status(500).send(e.message);
    } 
})