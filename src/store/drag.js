const state = {
    draggedIndex: -1,
    containerTop: 0,
    containerHeight: 75,
};

const getters = {
    DRAGGED_INDEX: (state) => {
        return state.draggedIndex;
    },
    CONTAINER_TOP: (state) => {
        return state.containerTop;
    },
    CONTAINER_HEIGHT: (state) => {
        return state.containerHeight;
    },
};

const mutations = {
    SET_DRAGGED_INDEX: (state, index) => {
        state.draggedIndex = index;
    },
    CHANGE_DRAGGED_INDEX: (state, direction) => {
        state.draggedIndex += direction;
    },
    SET_CONTAINER_TOP: (state, top) => {
        state.containerTop = top;
    },
};

const actions = {
    SET_DRAGGED_INDEX: (context, index) => {
        context.commit("SET_DRAGGED_INDEX", index);
    },
    CHANGE_DRAGGED_INDEX: (context, direction) => {
        context.commit("CHANGE_DRAGGED_INDEX", direction);
    },
    SET_CONTAINER_TOP: (context, top) => {
        context.commit("SET_CONTAINER_TOP", top);
    },
};

export default { state, getters, mutations, actions };
