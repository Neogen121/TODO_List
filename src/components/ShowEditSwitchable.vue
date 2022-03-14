<template>
    <div @dblclick.prevent="startEdit()">
        <span v-show="!valueEdited">{{ value }}</span>
        <input class="task__input" v-show="valueEdited" v-model="valueThis" @blur="stopEdit" ref="valueInput" />
    </div>
</template>

<script>
export default {
    name: "ShowEditSwitchable",
    props: ["name", "value", "index"],
    data() {
        return {
            valueEdited: false,
            valueThis: this.value,
        };
    },
    methods: {
        startEdit() {
            this.valueEdited = true;
            setTimeout(() => {
                this.$refs.valueInput.focus();
            }, 1);
        },

        stopEdit() {
            this.valueEdited = false;
            this.emitTaskChange();
        },

        emitTaskChange() {
            this.$emit("taskchange", { index: this.index, name: this.name, value: this.valueThis });
        },
    },
    watch: {
        value(newVal) {
            this.valueThis = newVal;
        },
    },
};
</script>
