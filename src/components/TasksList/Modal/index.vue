<template>
    <Transition name="modal--fade" appear>
        <div class="modal" v-if="showed" @click.self="close">
            <div class="modal__content">
                <TaskEdit v-if="type == 'TASK_EDIT'" />
                <ConfirmRemove v-if="type == 'CONFIRM_REMOVE'" />
                <InstructionsList v-if="type == 'INSTRUCTIONS_LIST'" />
            </div>
        </div>
    </Transition>
</template>

<script>
import TaskEdit from "./TaskEdit.vue";
import ConfirmRemove from "./ConfirmRemove.vue";
import InstructionsList from "./InstructionsList.vue";
import { mapGetters, mapActions } from "vuex";
import { gtypes, atypes } from "@/store/types";
export default {
    name: "ModalWindow",
    components: { TaskEdit, ConfirmRemove, InstructionsList },
    computed: {
        ...mapGetters({ showed: gtypes.MODAL_SHOWED, type: gtypes.MODAL_TYPE }),
    },
    methods: {
        ...mapActions({ close: atypes.HIDE_MODAL }),
    },
};
</script>

<style lang="scss">
.modal {
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 20;
    background: hsla(0, 0%, 50%, 0.5);
    justify-content: center;
    align-items: center;

    &__content {
        width: 400px;
        max-width: 90%;
        box-sizing: border-box;
        padding: 10px;
        background: #b3b3b3;
        border: 2px solid #878787;
    }

    &--fade {
        &-enter-active,
        &-leave-active {
            transition: opacity 0.1s;
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>
