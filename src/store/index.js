import { createStore } from "vuex";
import drag from "./drag";
import tasks from "./tasks";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { tasks, drag },
});
