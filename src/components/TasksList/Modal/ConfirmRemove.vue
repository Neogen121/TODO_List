<template>
    <div class="confirm-remove">
        <div class="confirm-remove__text">Do you really want to remove Task #{{ index + 1 }}?</div>
        <div class="confirm-remove__controls">
            <button class="confirm-remove__control" @click="remove">Remove</button>
            <button class="confirm-remove__control" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { gtypes, atypes } from "@/store/types";
export default {
    name: "ConfirmRemove",
    computed: {
        ...mapGetters({ index: gtypes.MODAL_TASK_INDEX }),
    },
    methods: {
        ...mapActions({ close: atypes.HIDE_MODAL }),

        cancel() {
            this.$store.dispatch(atypes.SHOW_MODAL, { type: "TASK_EDIT", index: this.index });
        },

        remove() {
            this.$store.dispatch(atypes.REMOVE_TASK, this.index);
            this.close();
        },
    },
};
</script>

<style lang="scss">
.confirm-remove {
    font-size: 1.3rem;

    &__text {
        font-size: inherit;
    }

    &__controls {
        display: flex;
        margin-top: 30px;
        justify-content: space-between;
        align-items: center;
    }

    &__control {
        font-size: inherit;
    }
}
</style>
