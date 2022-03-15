<template>
    <div class="task__controls">
        <DragPart :index="index" v-show="!selectionStarted"></DragPart>
        <SelectPart :index="index" v-show="selectionStarted"></SelectPart>
    </div>
</template>

<script>
import DragPart from "./DragPart.vue";
import SelectPart from "./SelectPart.vue";

export default {
    name: "DragSelectSwitchable",
    components: { DragPart, SelectPart },
    props: ["index"],
    computed: {
        selectionStarted() {
            return this.$store.getters.SELECTED_INDEXES.length > 0;
        },
    },
};
</script>
