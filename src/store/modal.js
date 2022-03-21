const state = {
    modalShowed: false,
    modalType: "",
    editedTaskIndex: -1,
};

const getters = {
    MODAL_SHOWED: (state) => {
        return state.modalShowed;
    },

    MODAL_TYPE: (state) => {
        return state.modalType;
    },

    MODAL_TASK_INDEX: (state) => {
        return state.editedTaskIndex;
    },
};

const mutations = {
    SHOW_MODAL: (state, data) => {
        state.modalType = data.type;
        state.editedTaskIndex = data.index ?? -1;
        state.modalShowed = true;
    },

    HIDE_MODAL: (state) => {
        state.modalShowed = false;
        state.modalType = "";
        state.editedTaskIndex = -1;
    },
};

const actions = {
    SHOW_MODAL: (context, data) => {
        context.commit("SHOW_MODAL", data);
    },

    HIDE_MODAL: (context) => {
        context.commit("HIDE_MODAL");
    },
};

export default { state, getters, mutations, actions };
