// src/itens/item.interface.ts

export interface BaseItem {
    nome: string;
    preco: number;
    descricao: string;
    img: string;
}

export interface Item extends BaseItem {
    id: number;
}