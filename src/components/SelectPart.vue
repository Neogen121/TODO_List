<template>
    <div class="task__selection" @click="toggleSelection">{{ selected ? "◼" : "◻" }}</div>
</template>

<script>
export default {
    name: "SelectPart",
    props: ["index"],
    computed: {
        selected: {
            get() {
                return this.$store.getters.SELECTED_INDEXES.includes(this.index);
            },
        },
    },
    methods: {
        toggleSelection() {
            this.$store.dispatch("TOGGLE_TASK_SELECTION", this.index);
        },
    },
};
</script>
