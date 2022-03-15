<template>
    <div @click="checked = !checked">
        <img class="task__checkmark" src="../assets/ui/checkmark-outlined.svg" v-show="!checked" />
        <img class="task__checkmark" src="../assets/ui/checkmark-filled.svg" v-show="checked" />
    </div>
</template>

<script>
export default {
    name: "CheckBox",
    props: ["index"],

    computed: {
        checked: {
            get() {
                return this.$store.getters.TASKS[this.index].checked;
            },
            set(newVal) {
                this.$store.dispatch("SET_TASK_PROPERTY", { index: this.index, field: "checked", value: newVal });
            },
        },
    },
};
</script>
