import { openDB } from 'idb'
import { ITable } from "../types/iTable"

const dbPromise = openDB('products', 1, {
    upgrade(db) {
        db.createObjectStore('products');
    }
})

export const set = async (key:number, tableData:ITable) => {
    return (await dbPromise).put('products', tableData, key)
}

export const keys = async () => {
    return (await dbPromise).getAllKeys('products')
}
export const getAll = async () => {
    return (await dbPromise).getAll('products')
}

export const deleteItem = async (key: string | string[]) => {
    console.log(key)
    return (await dbPromise).delete('products', key)
}

