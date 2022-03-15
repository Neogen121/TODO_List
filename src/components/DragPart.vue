<template>
    <div class="task__dragger" @mousedown.prevent="start" @touchstart.prevent="start">::::</div>
</template>

<script>
export default {
    name: "DragPart",
    props: ["index"],
    data() {
        return {
            mousePrevY: -1,
        };
    },

    computed: {
        top: {
            get() {
                return this.$store.getters.CONTAINER_TOP;
            },
            set(newVal) {
                this.$store.dispatch("SET_CONTAINER_TOP", newVal);
            },
        },

        height() {
            return this.$store.getters.CONTAINER_HEIGHT;
        },

        max() {
            return this.$store.getters.TASKS.length;
        },
        draggedIndex: {
            set(newVal) {
                this.$store.dispatch("SET_DRAGGED_INDEX", newVal);
            },
        },
    },

    methods: {
        orderChange(direction) {
            this.$store.dispatch("CHANGE_ORDER", { index: this.index, direction });
        },

        start() {
            window.addEventListener("mousemove", this.move);
            window.addEventListener("touchmove", this.move);
            window.addEventListener("mouseup", this.stop);
            window.addEventListener("touchend", this.stop);
            this.draggedIndex = this.index;
        },

        stop() {
            window.removeEventListener("mousemove", this.move);
            window.removeEventListener("touchmove", this.move);
            window.removeEventListener("mouseup", this.stop);
            window.removeEventListener("touchend", this.stop);
            this.top = 0;
            this.draggedIndex = -1;
            this.mousePrevY = -1;
        },

        move(event) {
            let posY = event.pageY;
            if (event.touches) posY = event.touches[0].pageY;
            if (this.mousePrevY == -1) this.mousePrevY = posY;
            this.top += posY - this.mousePrevY;
            this.mousePrevY = posY;

            if (this.top > this.height / 2 + 3 && this.index < this.max - 1) {
                this.orderChange(1);
                this.top -= this.height;
            }

            if (this.top < -(this.height / 2 + 3) && this.index > 0) {
                this.orderChange(-1);
                this.top += this.height;
            }
        },
    },
};
</script>
