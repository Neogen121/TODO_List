import { createStore } from "vuex";
import drag from "@/store/drag";
import tasks from "@/store/tasks";
import modal from "@/store/modal";
import notification from "@/store/notification";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { tasks, drag, modal, notification },
});
