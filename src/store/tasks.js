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
    ADD_TASK: (state, task) => {
        state.tasks.push(task);
    },

    SET_TASKS: (state, tasks) => {
        state.tasks = tasks;
    },

    SET_TASK: (state, data) => {
        ["name", "description", "checked"].forEach((field) => {
            state.tasks[data.index][field] = data.task[field];
        });
    },

    REMOVE_TASK: (state, index) => {
        state.tasks.splice(index, 1);
    },

    REMOVE_SELECTED_TASKS: (state) => {
        for (let i = state.selectedIndexes.length - 1; i >= 0; i--) {
            state.tasks.splice(state.selectedIndexes.sort()[i], 1);
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

    SET_CREATION_DATE: (state) => {
        state.tasks[state.tasks.length - 1].creationDate = new Date().toISOString();
    },

    SET_EDITED_DATE: (state, data) => {
        state.tasks[data.index].editedDate = new Date().toISOString();
    },

    SET_CHECKED_DATE: (state, data) => {
        state.tasks[data.index].checkedDate = data.value ? new Date().toISOString() : "";
    },

    SET_CHECKED_STATE: (state, data) => {
        state.tasks[data.index].checked = data.value;
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

    REMOVE_TASK: (context, index) => {
        context.commit("REMOVE_TASK", index);
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
        context.dispatch("PUSH_NOTIFICATION", `Task #${index + 1} was removed`);
    },

    REMOVE_SELECTED_TASKS: (context) => {
        context.commit("REMOVE_SELECTED_TASKS");
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
        context.dispatch("PUSH_NOTIFICATION", `Selected Tasks were removed`);
    },

    CHANGE_ORDER: (context, data) => {
        context.commit("CHANGE_ORDER", data);
        context.dispatch("SAVE_TASKS");
        context.dispatch("CHANGE_DRAGGED_INDEX", data.direction);
    },

    TRY_SET_TASK: (context, data) => {
        if (data.index > -1) {
            context.commit("SET_TASK", data);
            context.commit("SET_EDITED_DATE", data);
            context.dispatch("PUSH_NOTIFICATION", `Task #${data.index + 1} is edited`);
        } else {
            context.commit("ADD_TASK", data.task);
            context.commit("SET_CREATION_DATE");
            context.dispatch("PUSH_NOTIFICATION", `New Task added`);
        }
        context.commit("ASSIGN_IDS");
        context.dispatch("SAVE_TASKS");
    },

    SET_CHECKED_STATE: (context, data) => {
        context.commit("SET_CHECKED_STATE", data);
        context.commit("SET_CHECKED_DATE", data);
        context.dispatch("SAVE_TASKS");
        context.dispatch("PUSH_NOTIFICATION", `Task #${data.index + 1} is ${data.value ? "checked" : "unchecked"}`);
    },

    TOGGLE_TASK_SELECTION: (context, index) => {
        context.commit("TOGGLE_TASK_SELECTION", index);
    },
};

export default { state, getters, mutations, actions };
