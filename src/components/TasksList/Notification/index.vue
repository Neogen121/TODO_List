<template>
    <div class="notification">
        <TransitionGroup name="notification--list">
            <div v-for="item in notifications" :key="item.id">
                <div class="notification__content">
                    <img class="notification__icon" src="@/assets/ui/notification.svg" />
                    {{ item.text }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { gtypes } from "@/store/types";
export default {
    name: "NotificationComponent",
    computed: {
        ...mapGetters({ notifications: gtypes.NOTIFICATIONS }),
    },
};
</script>

<style lang="scss">
.notification {
    position: fixed;
    bottom: 0;
    right: 0;

    &__content {
        display: flex;
        width: 20rem;
        height: 3rem;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid gray;
        font-size: 1.3rem;
        align-items: center;
    }

    &--list {
        &-move,
        &-enter-active,
        &-leave-active {
            transition: 0.5s;
        }
        &-enter-from {
            transform: translateY(3rem);
        }
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>
