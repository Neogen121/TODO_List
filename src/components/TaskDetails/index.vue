<template>
    <div class="task-details">
        <router-link to="/">← Back to Main</router-link>
        <div class="task-details__field" v-for="(value, key) in fields" :key="key">
            <div class="task-details__field-name">{{ value }}:</div>
            <div class="task-details__field-value">{{ formatData(task[key]) }}</div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { gtypes } from "@/store/types";

export default {
    name: "TaskDetails",
    components: {},
    props: ["index"],
    data() {
        return {
            fields: {
                name: "Name",
                description: "Description",
                creationDate: "Creation Date",
                editedDate: "Edited Date",
                checkedDate: "Checked Date",
            },
        };
    },
    computed: {
        ...mapGetters({ tasks: gtypes.TASKS }),

        task() {
            return this.tasks[this.index];
        },
    },
    methods: {
        formatData(data = "") {
            let date = new Date(data);
            if (!isNaN(date)) {
                let timeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
                let dateLocal = new Date(date - timeZoneOffset).toISOString();
                return dateLocal.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, "$3.$2.$1 $4:$5:$6");
            }
            return data;
        },
    },
};
</script>

<style lang="scss">
.task-details {
    font-size: 1.3rem;
    box-sizing: border-box;
    padding: 10px;
    border: 1px dotted gray;

    &__field {
        display: flex;
        align-items: center;
        margin: 5px 0;
        border-bottom: 1px solid lightgray;
    }

    &__field-name {
        flex: 0 0 9rem;
    }
}
</style>
