<template>
    <div @click="checked = !checked">
        <img class="task__checkmark" src="@/assets/ui/checkmark-outlined.svg" v-show="!checked" />
        <img class="task__checkmark" src="@/assets/ui/checkmark-filled.svg" v-show="checked" />
    </div>
</template>

<script>
import { atypes } from "@/store/types";
export default {
    name: "CheckBox",
    props: ["index"],

    computed: {
        checked: {
            get() {
                return this.$store.getters.TASKS[this.index].checked;
            },
            set(newVal) {
                this.$store.dispatch(atypes.SET_CHECKED_STATE, { index: this.index, value: newVal });
            },
        },
    },
};
</script>

<style lang="scss">
.task {
    &__checkmark {
        box-sizing: border-box;
        height: 100%;
        width: 50px;
        padding: 10px;
        cursor: pointer;
    }
}
</style>
