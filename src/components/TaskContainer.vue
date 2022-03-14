<template>
    <div class="task">
        <div
            class="task__container"
            :style="{ top: container.top + 'px', height: container.height + 'px', 'z-index': container.zIndex }"
            ref="container"
        >
            <CheckBox :index="index" :checked="checked" @togglechecked="$emit('togglechecked', $event)"></CheckBox>

            <div
                class="task__info"
                @mousedown="infoMouseDown"
                @touchstart.passive="infoMouseDown"
                @mouseup="infoMouseUp"
                @mouseleave="infoMouseUp"
            >
                <ShowEditSwitchable
                    v-for="field in ['name', 'description']"
                    :key="field"
                    :class="'task__' + field + (checked ? ' task__' + field + '--checked' : '')"
                    :name="field"
                    :value="$props[field]"
                    :index="index"
                    @taskchange="$emit('taskchange', $event)"
                ></ShowEditSwitchable>
            </div>

            <div class="task__controls">
                <div class="task__dragger" v-show="!selectionStarted" @mousedown.prevent="drag.start" @touchstart.prevent="drag.start">
                    ::::
                </div>
                <div class="task__selection" v-show="selectionStarted" @click="toggleSelectionEvent">{{ selected ? "◼" : "◻" }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckBox from "./CheckBox.vue";
import ShowEditSwitchable from "./ShowEditSwitchable.vue";

export default {
    name: "TaskContainer",
    components: { ShowEditSwitchable, CheckBox },
    props: ["id", "name", "description", "checked", "index", "max", "selectedindexes"],
    data() {
        return {
            mousePrevY: -1,
            container: { top: 0, height: 80, zIndex: 0 },
            selectionTimeout: null,
            selectionStarted: false,
            selected: false,
        };
    },
    methods: {
        infoMouseDown() {
            this.selectionTimeout = setTimeout(this.selectionStartEvent, 500);
            window.addEventListener("touchmove", this.infoTouchMoveEvent);
            window.addEventListener("touchend", this.infoMouseUp);
            window.addEventListener("scroll", this.infoMouseUp);
        },
        infoMouseUp() {
            clearTimeout(this.selectionTimeout);
            window.removeEventListener("touchmove", this.infoTouchMoveEvent);
            window.removeEventListener("touchend", this.infoMouseUp);
            window.removeEventListener("scroll", this.infoMouseUp);
        },
        infoTouchMoveEvent(event) {
            let containerBounds = this.$refs.container.getBoundingClientRect();
            if (containerBounds.top > event.touches[0].pageY || containerBounds.bottom < event.touches[0].pageY) {
                this.infoMouseUp();
            }
        },

        selectionStartEvent() {
            if (!this.nameEdit && !this.descriptionEdit) {
                this.emit.selectionStarted();
            }
        },
        setSelection(selected) {
            this.selected = selected;
        },
        toggleSelectionEvent() {
            this.emit.toggleSelection();
        },
    },
    created() {
        this.emit = {
            taskChange: () => {
                this.$emit("taskchange", { index: this.index, name: this.nameData, description: this.descriptionData });
            },
            orderChange: (toDown) => {
                this.$emit("orderchange", { index: this.index, toDown });
            },
            selectionStarted: () => {
                this.$emit("selectionstarted", { index: this.index });
            },
            toggleSelection: () => {
                this.$emit("toggleselection", { index: this.index, value: !this.selected });
            },
        };
        this.drag = {
            start: () => {
                window.addEventListener("mousemove", this.drag.move);
                window.addEventListener("touchmove", this.drag.move);
                window.addEventListener("mouseup", this.drag.stop);
                window.addEventListener("touchend", this.drag.stop);
                this.container.zIndex = 10;
            },
            stop: () => {
                window.removeEventListener("mousemove", this.drag.move);
                window.removeEventListener("touchmove", this.drag.move);
                window.removeEventListener("mouseup", this.drag.stop);
                window.removeEventListener("touchend", this.drag.stop);
                this.container.top = 0;
                this.container.zIndex = 0;
                this.mousePrevY = -1;
            },
            move: (event) => {
                let posY = event.pageY;
                if (event.touches) posY = event.touches[0].pageY;
                if (this.mousePrevY == -1) this.mousePrevY = posY;
                this.container.top += posY - this.mousePrevY;
                this.mousePrevY = posY;

                if (this.container.top > this.container.height / 2 + 3 && this.index < this.max - 1) {
                    this.emit.orderChange(true);
                    this.container.top -= this.container.height;
                }
                if (this.container.top < -(this.container.height / 2 + 3) && this.index > 0) {
                    this.emit.orderChange(false);
                    this.container.top += this.container.height;
                }
            },
        };
    },
    watch: {
        selectedindexes(newVal) {
            this.selectionStarted = newVal.length > 0;
            this.setSelection(newVal.includes(this.index));
        },
    },
};
</script>
