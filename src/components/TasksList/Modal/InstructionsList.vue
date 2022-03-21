<template>
    <div class="instructions-list">
        <div class="instructions-list__title">Instructions:</div>
        <div class="instructions-list__text">
            <p>click on item to edit</p>
            <p>long click for multiselection</p>
            <p>drag right side(::::) to reorder</p>
            <p>doubleclick "TO-DO List" to reset</p>
        </div>
        <button class="instructions-list__control" @click="close">Close</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { atypes } from "@/store/types";
export default {
    name: "InstructionsList",
    methods: {
        ...mapActions({ close: atypes.HIDE_MODAL }),
    },
};
</script>

<style lang="scss">
.instructions-list {
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    text-align: center;

    &__title {
        font-size: 1.7rem;
    }

    &__control {
        font-size: inherit;
    }
}
</style>
