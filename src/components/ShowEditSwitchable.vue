<template>
    <div :class="'task__' + field + (checked ? ' task__' + field + '--checked' : '')" @dblclick.prevent="startEdit()">
        <span v-show="!valueEdited">{{ value }}</span>
        <input class="task__input" v-show="valueEdited" v-model="value" @blur="stopEdit" ref="valueInput" />
    </div>
</template>

<script>
export default {
    name: "ShowEditSwitchable",
    props: ["index", "field"],
    data() {
        return {
            valueEdited: false,
        };
    },

    computed: {
        value: {
            get() {
                return this.$store.getters.TASKS[this.index][this.field];
            },
            set(newVal) {
                this.$store.dispatch("SET_TASK_PROPERTY", { index: this.index, field: this.field, value: newVal });
            },
        },

        checked() {
            return this.$store.getters.TASKS[this.index].checked;
        },
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
        },
    },
};
</script>
