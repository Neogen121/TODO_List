<template>
    <div class="task__selection" @click="toggleSelection">{{ selected ? "◼" : "◻" }}</div>
</template>

<script>
import { mapGetters } from "vuex";
import { gtypes, atypes } from "@/store/types";
export default {
    name: "SelectPart",
    props: ["index"],
    computed: {
        ...mapGetters({
            selectedIndexes: gtypes.SELECTED_INDEXES,
        }),
        selected() {
            return this.selectedIndexes.includes(this.index);
        },
    },
    methods: {
        toggleSelection() {
            this.$store.dispatch(atypes.TOGGLE_TASK_SELECTION, this.index);
        },
    },
};
</script>
<style lang="scss">
.task {
    &__selection {
        display: flex;
        height: 100%;
        font-size: 3rem;
        padding: 0 0 7px 3px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
    }
}
</style>
