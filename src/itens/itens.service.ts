// src/itens/itens.service.ts

/**
 * Interfaces de modelo de dados
 */
import { BaseItem, Item } from "./item.interface";
import { Itens } from "./itens.interface";

/**
 * Popula itens
 */
let itens: Itens = {
    1: {
        id: 1,
        nome: "Xis",
        preco: 20,
        descricao: "Completo",
        img: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        nome: "Pizza",
        preco: 45,
        descricao: "Sabor Strogonoff",
        img: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        nome: "Coca-Cola",
        preco: 8,
        descricao: "Bebida gelada",
        img: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};

/**
 * Service Methods
 */
export const findAll = async (): Promise<Item[]> => Object.values(itens);

export const find = async (id: number): Promise<Item> => itens[id];

export const create = async (novoItem: BaseItem): Promise<Item> => {
    const id = new Date().valueOf();

    itens[id] = {
        id,
        ...novoItem,
    };

    return itens[id];
};

export const update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    itens[id] = { id, ...itemUpdate };

    return itens[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete itens[id];
};