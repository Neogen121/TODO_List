<template>
    <div class="body__wrap">
        <div class="header">
            <div class="header__title" @dblclick="setDefaultTasks()">TO-DO List</div>
            <div class="header__controls">
                <img class="header__control" src="./assets/ui/info.svg" @click="showInfo" />
                <img class="header__control" src="./assets/ui/add.svg" @click="addTask" />
                <img
                    class="header__control"
                    :class="selectedIndexes.length === 0 ? 'header__control--hidden' : ''"
                    src="./assets/ui/remove.svg"
                    @click="removeTasks()"
                />
            </div>
        </div>
        <div class="tasks-list">
            <TaskContainer v-for="(task, index) in tasks" :key="task.id" :index="index"></TaskContainer>
        </div>
    </div>
</template>

<script>
import TaskContainer from "./components/TaskContainer.vue";
import { TaskClass } from "./js/classes";

export default {
    name: "App",
    components: { TaskContainer },

    data() {
        return {};
    },

    computed: {
        tasks() {
            return this.$store.getters.TASKS;
        },

        selectedIndexes() {
            return this.$store.getters.SELECTED_INDEXES;
        },
    },
    methods: {
        addTask() {
            this.$store.dispatch("ADD_TASK", new TaskClass("Name", "Description"));
        },

        removeTasks() {
            if (confirm("Do you really want to delete?")) {
                this.$store.dispatch("REMOVE_TASKS");
            }
        },

        showInfo() {
            const info = `
            doubleclick on text field to edit
            long click for multiselection
            drag right side to reorder
            doubleclick header title to reset
            `;
            alert(info);
        },

        orderChange(data) {
            let directionSign = data.toDown ? 1 : -1;
            var task = this.tasks[data.index];
            this.tasks.splice(data.index, 1);
            this.tasks.splice(data.index + directionSign, 0, task);
        },

        setDefaultTasks() {
            this.$store.dispatch("SET_DEFAULT_TASKS");
        },
    },
    mounted() {
        this.$store.dispatch("TRY_LOAD_TASKS");
    },
};
</script>
