<template>
    <TaskDetails :index="index - 1" />
</template>
<script>
import TaskDetails from "@/components/TaskDetails";
export default {
    name: "TaskDetailsView",
    props: ["index"],
    components: { TaskDetails },
};
</script>
