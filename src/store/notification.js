const state = {
    notifications: [],
};

const getters = {
    NOTIFICATIONS: (state) => {
        return state.notifications;
    },
};

const mutations = {
    PUSH_NOTIFICATION: (state, text) => {
        state.notifications.push({ text, id: Math.random() * 100 });
    },

    REMOVE_FIRST_NOTIFICATION: (state) => {
        if (state.notifications.length > 0) {
            state.notifications.splice(0, 1);
        }
    },
};

const actions = {
    PUSH_NOTIFICATION: (context, text) => {
        context.commit("PUSH_NOTIFICATION", text);
        setTimeout(() => {
            context.commit("REMOVE_FIRST_NOTIFICATION");
        }, 3000);
    },
};

export default { state, getters, mutations, actions };
