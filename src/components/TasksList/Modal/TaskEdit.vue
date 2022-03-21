<template>
    <div class="task-edit">
        <div class="task-edit__header">
            <div class="task-edit__title">{{ title }}</div>
            <img class="task-edit__header-control" v-if="!isNewTask" src="@/assets/ui/info.svg" @click="showInfo" />
            <img class="task-edit__header-control" v-if="!isNewTask" src="@/assets/ui/remove.svg" @click="remove" />
        </div>

        <div v-for="field in fields" :key="field">
            <p>
                <span>{{ field }}:</span>
                <br />
                <input class="task-edit__input" v-model="this[field]" />
            </p>
        </div>
        <div class="task-edit__bottom-controls">
            <button class="task-edit__bottom-control" @click="apply">{{ isNewTask ? "Add" : "Apply" }}</button>
            <button class="task-edit__bottom-control" @click="close">Cancel</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { gtypes, atypes } from "@/store/types";
import { TaskClass } from "@/js/classes";
export default {
    name: "TaskEdit",
    data() {
        return { fields: ["name", "description"] };
    },
    computed: {
        ...mapGetters({ index: gtypes.MODAL_TASK_INDEX, tasks: gtypes.TASKS }),

        isNewTask() {
            return this.index === -1;
        },

        task() {
            return this.tasks[this.index];
        },

        title() {
            return this.index >= 0 ? `Task #${this.index + 1}` : `New Task`;
        },
    },
    methods: {
        ...mapActions({ close: atypes.HIDE_MODAL }),

        apply() {
            this.$store.dispatch(atypes.TRY_SET_TASK, { task: new TaskClass(this.name, this.description), index: this.index });
            this.close();
        },

        showInfo() {
            this.$router.push({ path: `/task-${this.index + 1}` });
        },

        remove() {
            this.$store.dispatch(atypes.SHOW_MODAL, { type: "CONFIRM_REMOVE", index: this.index });
        },
    },
    created() {
        this.fields.forEach((field) => {
            this[field] = this.isNewTask ? "" : this.task?.[field];
        });
    },
};
</script>

<style lang="scss">
.task-edit {
    font-size: 1.3rem;

    &__input {
        width: 98%;
        font-size: inherit;
    }

    &__bottom-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__bottom-control {
        font-size: inherit;
    }

    &__header {
        display: flex;
    }

    &__title {
        flex: 1;
        font-size: 1.6rem;
    }

    &__header-control {
        margin: 0 5px;
        height: 25px;
        cursor: pointer;
    }
}
</style>
