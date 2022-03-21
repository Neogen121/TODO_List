import { createRouter, createWebHistory } from "vue-router";
import TasksList from "@/views/TasksListView.vue";
import TaskDetails from "@/views/TaskDetailsView.vue";

const routes = [
    {
        path: "/",
        name: "TasksList",
        component: TasksList,
    },
    {
        path: "/task-:index",
        name: "TaskDetails",
        component: TaskDetails,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
