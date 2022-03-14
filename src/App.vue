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
            <TaskContainer
                v-for="(task, index) in tasks"
                :key="task.id"
                v-bind="task"
                :index="index"
                :max="tasks.length"
                :selectedindexes="selectedIndexes"
                @taskchange="taskChange"
                @orderchange="orderChange"
                @selectionstarted="selectionStarted"
                @toggleselection="toggleSelection"
                @togglechecked="toggleChecked"
            ></TaskContainer>
        </div>
    </div>
</template>

<script>
import TaskContainer from "./components/TaskContainer.vue";
import { TaskClass } from "./js/classes";
import { defaultTasks } from "./js/defaultTasks";

export default {
    name: "App",
    components: {
        TaskContainer,
    },
    data() {
        return {
            tasks: [],
            selectedIndexes: [],
        };
    },
    methods: {
        addTask() {
            this.tasks.push(new TaskClass("Name", "Description"));
            this.assignIDs();
        },

        removeTasks() {
            if (confirm("Do you really want to delete?")) {
                for (let i = this.selectedIndexes.length - 1; i >= 0; i--) {
                    this.tasks.splice(this.selectedIndexes[i], 1);
                }
                this.selectedIndexes = [];
                this.assignIDs();
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

        taskChange(data) {
            this.tasks[data.index][data.name] = data.value;
        },

        orderChange(data) {
            let directionSign = data.toDown ? 1 : -1;
            var task = this.tasks[data.index];
            this.tasks.splice(data.index, 1);
            this.tasks.splice(data.index + directionSign, 0, task);
        },

        selectionStarted(data) {
            this.selectedIndexes = [data.index];
        },

        toggleSelection(data) {
            if (data.value) {
                this.selectedIndexes.push(data.index);
                this.selectedIndexes = [...this.selectedIndexes];
            } else {
                let indexOfIndex = this.selectedIndexes.indexOf(data.index);
                this.selectedIndexes.splice(indexOfIndex, 1);
                this.selectedIndexes = [...this.selectedIndexes];
            }
            //this.selectedIndexes = [data.index];
        },

        toggleChecked(data) {
            this.tasks[data.index].checked = data.value;
        },

        saveToLS() {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },

        setDefaultTasks() {
            this.tasks = defaultTasks;
            this.saveToLS();
        },

        assignIDs() {
            let id = 0;
            this.tasks.forEach((task) => {
                task.id = id++;
            });
        },
    },
    created() {
        let tryRestoreTasks = () => {
            if (checkTasksInLS()) {
                loadTasksFromLS();
            } else {
                this.setDefaultTasks();
            }
            this.assignIDs();
        };

        let checkTasksInLS = () => {
            return localStorage.getItem("tasks") !== null;
        };

        let loadTasksFromLS = () => {
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        };

        tryRestoreTasks();
    },
    watch: {
        tasks: {
            deep: true,
            handler() {
                this.saveToLS();
            },
        },
    },
};
</script>
