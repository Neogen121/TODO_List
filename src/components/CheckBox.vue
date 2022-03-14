<template>
    <div @click="toggleChecked">
        <img class="task__checkmark" src="../assets/ui/checkmark-outlined.svg" v-show="!checkedThis" />
        <img class="task__checkmark" src="../assets/ui/checkmark-filled.svg" v-show="checkedThis" />
    </div>
</template>

<script>
export default {
    name: "CheckBox",
    props: ["index", "checked"],
    data() {
        return {
            checkedThis: this.checked,
        };
    },
    methods: {
        toggleChecked() {
            this.emitToggleChecked();
        },
        emitToggleChecked() {
            this.$emit("togglechecked", { index: this.index, value: !this.checked });
        },
    },
    watch: {
        checked(newVal) {
            this.checkedThis = newVal;
        },
    },
};
</script>
