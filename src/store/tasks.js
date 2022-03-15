import { defaultTasks } from "@/js/defaultTasks";
const state = { tasks: [], selectedIndexes: [] };

const getters = {
    TASKS: (state) => {
        return state.tasks;
    },

    SELECTED_INDEXES: (state) => {
        return state.selectedIndexes;
    },
};

const mutations = {
    SET_TASKS: (state, tasks) => {
        state.tasks = tasks;
    },

    ADD_TASK: (state, task) => {
        state.tasks.push(task);
    },

    REMOVE_TASKS: (state) => {
        for (let i = state.selectedIndexes.length - 1; i >= 0; i--) {
            state.tasks.splice(state.selectedIndexes[i], 1);
        }
        state.selectedIndexes = [];
    },

    CHANGE_ORDER: (state, data) => {
        var task = state.tasks[data.index];
        state.tasks.splice(data.index, 1);
        state.tasks.splice(data.index + data.direction, 0, task);
    },

    ASSIGN_IDS: (state) => {
        state.tasks.forEach((task, index) => {
            task.id = index;
        });
    },

    SET_TASK_PROPERTY: (state, data) => {
        state.tasks[data.index][data.field] = data.value;
        state.tasks = [...state.tasks];
    },

    TOGGLE_TASK_SELECTION: (state, index) => {
        if (state.selectedIndexes.includes(index)) {
            let indexOfIndex = state.selectedIndexes.indexOf(index);
            state.selectedIndexes.splice(indexOfIndex, 1);
        } else {
            state.selectedIndexes.push(index);
        }
    },
};

const actions = {
    TRY_LOAD_TASKS: (context) => {
        if (localStorage.getItem("tasks") === null) {
            context.dispatch("SET_DEFAULT_TASKS");
            context.dispatch("SAVE_TASKS");
        }
        context.dispatch("LOAD_TASKS");
    },

    LOAD_TASKS: (context) => {
        context.commit("SET_TASKS", JSON.parse(localStorage.getItem("tasks")));
        context.commit("ASSIGN_IDS");
    },

    SAVE_TASKS: (context) => {
        localStorage.setItem("tasks", JSON.stringify(context.getters.TASKS));
    },

    SET_DEFAULT_TASKS: (context) => {
        context.commit(
            "SET_TASKS",
            defaultTasks.map((a) => {
                return { ...a };
            })
        );
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
    },

    ADD_TASK: (context, task) => {
        context.commit("ADD_TASK", task);
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
    },

    REMOVE_TASKS: (context) => {
        context.commit("REMOVE_TASKS");
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
    },

    CHANGE_ORDER: (context, data) => {
        context.commit("CHANGE_ORDER", data);
        context.dispatch("SAVE_TASKS");
        context.dispatch("CHANGE_DRAGGED_INDEX", data.direction);
    },

    SET_TASK_PROPERTY: (context, data) => {
        context.commit("SET_TASK_PROPERTY", data);
        context.dispatch("SAVE_TASKS");
    },

    TOGGLE_TASK_SELECTION: (context, index) => {
        context.commit("TOGGLE_TASK_SELECTION", index);
    },
};

export default { state, getters, mutations, actions };
