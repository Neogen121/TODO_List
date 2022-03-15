<template>
    <div class="task">
        <div class="task__container" :style="{ top: top + 'px', height: height + 'px', 'z-index': zIndex }" ref="container">
            <CheckBox :index="index"></CheckBox>

            <div
                class="task__info"
                @mousedown="startSelectionTimeout"
                @touchstart.passive="startSelectionTimeout"
                @mouseup="clearSelectionTimeout"
                @mouseleave="clearSelectionTimeout"
            >
                <ShowEditSwitchable
                    v-for="field in ['name', 'description']"
                    :key="field"
                    :index="index"
                    :field="field"
                ></ShowEditSwitchable>
            </div>

            <DragSelectSwitchable :index="index"></DragSelectSwitchable>
        </div>
    </div>
</template>

<script>
import CheckBox from "./CheckBox.vue";
import ShowEditSwitchable from "./ShowEditSwitchable.vue";
import DragSelectSwitchable from "./DragSelectSwitchable.vue";

export default {
    name: "TaskContainer",
    components: { CheckBox, ShowEditSwitchable, DragSelectSwitchable },
    props: ["index", "max"],

    data() {
        return {
            selectionTimeout: null,
        };
    },
    computed: {
        draggedIndex() {
            return this.$store.getters.DRAGGED_INDEX;
        },

        top() {
            if (this.draggedIndex === this.index) {
                return this.$store.getters.CONTAINER_TOP;
            } else {
                return 0;
            }
        },

        zIndex() {
            return this.draggedIndex === this.index ? 10 : 0;
        },

        height() {
            return this.$store.getters.CONTAINER_HEIGHT;
        },
    },

    methods: {
        toggleSelection() {
            this.$store.dispatch("TOGGLE_TASK_SELECTION", this.index);
        },

        startSelectionTimeout() {
            this.selectionTimeout = setTimeout(this.toggleSelection, 500);
            window.addEventListener("touchmove", this.touchMove);
            window.addEventListener("touchend", this.clearSelectionTimeout);
            window.addEventListener("scroll", this.clearSelectionTimeout);
        },

        clearSelectionTimeout() {
            clearTimeout(this.selectionTimeout);
            window.removeEventListener("touchmove", this.touchMove);
            window.removeEventListener("touchend", this.clearSelectionTimeout);
            window.removeEventListener("scroll", this.clearSelectionTimeout);
        },

        touchMove(event) {
            let containerBounds = this.$refs.container.getBoundingClientRect();
            if (containerBounds.top > event.touches[0].pageY || containerBounds.bottom < event.touches[0].pageY) {
                this.clearSelectionTimeout();
            }
        },
    },
};
</script>
