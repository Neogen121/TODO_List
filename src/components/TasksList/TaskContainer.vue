<template>
    <div class="task">
        <div class="task__container" :style="{ top: top + 'px', height: height + 'px', 'z-index': zIndex }" ref="container">
            <CheckBox :index="index"></CheckBox>

            <div
                class="task__info"
                @click="showTaskEdit"
                @mousedown="startSelectionTimeout"
                @touchstart.passive="startSelectionTimeout"
                @mouseup="clearSelectionTimeout"
                @mouseleave="clearSelectionTimeout"
            >
                <ShowField v-for="field in ['name', 'description']" :key="field" :index="index" :field="field"></ShowField>
            </div>

            <DragSelectSwitchable :index="index"></DragSelectSwitchable>
        </div>
    </div>
</template>

<script>
import CheckBox from "./CheckBox.vue";
import ShowField from "./ShowField.vue";
import DragSelectSwitchable from "./DragSelectSwitchable.vue";
import { mapGetters, mapActions } from "vuex";
import { gtypes, atypes } from "@/store/types";

export default {
    name: "TaskContainer",
    components: { CheckBox, ShowField, DragSelectSwitchable },
    props: ["index", "max"],

    data() {
        return {
            selectionTimeout: null,
            timeoutFired: true,
        };
    },
    computed: {
        ...mapGetters({
            draggedIndex: gtypes.DRAGGED_INDEX,
            height: gtypes.CONTAINER_HEIGHT,
        }),

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
    },

    methods: {
        ...mapActions({
            toggleSelection: atypes.TOGGLE_TASK_SELECTION,
        }),

        timeoutFunction() {
            this.toggleSelection(this.index);
            this.timeoutFired = true;
        },

        startSelectionTimeout() {
            this.timeoutFired = false;
            this.selectionTimeout = setTimeout(this.timeoutFunction, 500);
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

        showTaskEdit() {
            if (!this.timeoutFired) {
                this.$store.dispatch(atypes.SHOW_MODAL, { type: "TASK_EDIT", index: this.index });
            }
        },
    },
};
</script>

<style lang="scss">
.task {
    &__container {
        display: flex;
        position: relative;
        top: 0;
        background: white;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        border: ridge 5px gray;
    }

    &__info {
        flex: 1;
        display: flex;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>
