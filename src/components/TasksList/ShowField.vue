<template>
    <div :class="'task__' + field + (checked ? ' task__' + field + '--checked' : '')">
        <span>{{ value }}</span>
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
        },

        checked() {
            return this.$store.getters.TASKS[this.index].checked;
        },
    },
};
</script>

<style lang="scss">
.task {
    &__name {
        font-size: 1.5rem;
        font-weight: 700;

        &--checked {
            text-decoration: line-through 2px;
        }
    }

    &__description {
        &--checked {
            text-decoration: line-through 2px;
        }
    }

    &__input {
        width: 95%;
    }
}
</style>
