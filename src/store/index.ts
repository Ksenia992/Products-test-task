import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import productsModule from "./productsModule"


const store = createStore({
    modules: {
        productsModule
    },
    plugins: [createPersistedState()]
})

export default store
