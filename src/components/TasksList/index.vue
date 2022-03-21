<template>
    <div class="header">
        <div class="header__title" @dblclick="setDefaultTasks">TO-DO List</div>
        <div class="header__controls">
            <img class="header__control" src="@/assets/ui/info.svg" @click="showInfo" />
            <img class="header__control" src="@/assets/ui/add.svg" @click="addTask" />
            <img
                class="header__control"
                :class="selectedIndexes.length === 0 ? 'header__control--hidden' : ''"
                src="@/assets/ui/remove.svg"
                @click="removeTasks"
            />
        </div>
    </div>
    <div class="tasks-list">
        <TaskContainer v-for="(task, index) in tasks" :key="task.id" :index="index"></TaskContainer>
    </div>
    <Notification />
    <Modal />
</template>

<script>
import TaskContainer from "./TaskContainer.vue";
import Modal from "./Modal";
import Notification from "@/components/TasksList/Notification";
import { mapGetters } from "vuex";
import { gtypes, atypes } from "@/store/types";
export default {
    name: "TasksList",
    components: { TaskContainer, Modal, Notification },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            tasks: gtypes.TASKS,
            selectedIndexes: gtypes.SELECTED_INDEXES,
        }),
    },
    methods: {
        addTask() {
            this.$store.dispatch(atypes.SHOW_MODAL, { type: "TASK_EDIT", index: -1 });
        },
        removeTasks() {
            if (confirm("Do you really want to delete?")) {
                this.$store.dispatch(atypes.REMOVE_SELECTED_TASKS);
            }
        },
        showInfo() {
            this.$store.dispatch(atypes.SHOW_MODAL, { type: "INSTRUCTIONS_LIST" });
        },
        setDefaultTasks() {
            this.$store.dispatch(atypes.SET_DEFAULT_TASKS);
        },
    },
};
</script>

<style lang="scss">
.header {
    display: flex;
    position: fixed;
    width: 500px;
    max-width: 98%;
    height: 50px;
    box-sizing: border-box;
    padding: 5px;
    background: white;
    border: 2px dotted gray;
    align-items: center;
    z-index: 20;

    &__title {
        flex: 1;
        font-size: 3rem;
        user-select: none;
    }

    &__controls {
        height: 100%;
        display: flex;
    }

    &__control {
        height: 100%;
        margin: 0 5px;
        cursor: pointer;

        &--hidden {
            visibility: hidden;
        }
    }
}

.tasks-list {
    position: relative;
    top: 50px;
}
</style>
