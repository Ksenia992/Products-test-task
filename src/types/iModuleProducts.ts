import { ITable } from "./iTable"
import { Commit } from 'vuex'

export type ModuleProductsState = {
    products: ITable[]
}

export interface CommitFunction {
    commit: Commit
}

export interface CommitStateFunction<T> extends CommitFunction {
    state: T
}
