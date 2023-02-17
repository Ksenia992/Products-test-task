import { createStore } from "vuex"

export default createStore({
    state: {
     products: JSON.parse(localStorage.getItem("products") || "[]"),
    },
    getters: {
        getProducts: state => state.products
    },
    mutations: {
        SET_DATA(state, data) {
            state.products.push(data)
            localStorage.setItem("products", JSON.stringify(state.products))
        }
    }
});
