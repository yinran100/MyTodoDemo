/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
Vue.use(Vuex);
//本地存储
let saveToLocalSrorage = (key, item) => {
    try {
        localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {}
};
const mutations = {
    setProvinceId(state, item) {
        state.provinceId = item;
    }
};

const getters = {
};

export default new Vuex.Store({
    getters,
    state,
    mutations
});