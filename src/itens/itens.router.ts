/**
 * Módulos e Interfaces externas
 */
import express, { Request, Response } from "express";
import * as ItemService from "./itens.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Rotas
 */
export const itensRouter = express.Router();

/**
 * Controllers
 */

// GET itens
itensRouter.get("/", async (req: Request, res: Response) => {
    try {
        const itens: Item[] = await ItemService.findAll();

        res.status(200).send(itens);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET itens/:id
itensRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);

        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send("item não encontrado");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST itens
itensRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;

        const newItem = await ItemService.create(item);

        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// PUT itens/:id
itensRouter.put("/:id", async (req: Request, res: Response) => {
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

// DELETE itens/:id
itensRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);

        res.sendStatus(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
