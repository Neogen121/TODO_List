<template>
    <div class="task__controls">
        <DragPart :index="index" v-show="!selectionStarted"></DragPart>
        <SelectPart :index="index" v-show="selectionStarted"></SelectPart>
    </div>
</template>

<script>
import DragPart from "./DragPart.vue";
import SelectPart from "./SelectPart.vue";
import { mapGetters } from "vuex";
import { gtypes } from "@/store/types";

export default {
    name: "DragSelectSwitchable",
    components: { DragPart, SelectPart },
    props: ["index"],
    computed: {
        ...mapGetters({ selectedIndexes: gtypes.SELECTED_INDEXES }),

        selectionStarted() {
            return this.selectedIndexes.length > 0;
        },
    },
};
</script>

<style lang="scss">
.task {
    &__controls {
        height: 100%;
        width: 50px;
        background: #eee;
        cursor: pointer;
    }
}
</style>
