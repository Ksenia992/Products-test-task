import {ITable} from "../types/iTable"
import { ModuleProductsState, CommitStateFunction } from "../types/iModuleProducts"
import { set, deleteItem, getAll, keys } from '../api/idb'

const productsModule = {
    namespaced: true,
    state: {
        products: [],
    } as ModuleProductsState,
    mutations: {
        SET_DATA(state: ModuleProductsState, data: ITable) {
            if (!state.products.find(product => product.id === data.id)) {
              state.products.push(data)
            }
        },
        REMOVE_DATA(state: ModuleProductsState, idsArray: number[]) {
            state.products.reduce((acc) => {
                state.products = acc.filter(product => !idsArray.includes(product.id))
                return state.products
            }, state.products)
        }
    },
    actions: {
        async addProduct({state, commit}:CommitStateFunction<ModuleProductsState>, tableData:ITable) {
            await commit('SET_DATA', tableData)
            await set(tableData.id, tableData)
        },

        // Can be used on mounted hook for getting data from database
        async getData({ commit }:CommitStateFunction<ModuleProductsState>) {
            let [keyss, values] = await Promise.all([keys(), getAll()])
            const dbData = keyss.map((key, index) => (values[index]))
            commit('SET_DATA', ...dbData)
        },
        async deleteData({state, commit}:CommitStateFunction<ModuleProductsState>, ids:string[]) {
            if(ids.length > 1) {
                ids.forEach(async id => await deleteItem(id))
            } else {
                await deleteItem([...ids])
            }
            await commit('REMOVE_DATA', ids)
        }
    }
}

export default productsModule
