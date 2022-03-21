<template>
    <div class="body__wrap">
        <router-view />
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch("TRY_LOAD_TASKS");
    },
};
</script>
<style lang="scss">
@font-face {
    font-family: "Roboto";
    src: url("@/fonts/Roboto-Bold.ttf");
    src: url("@/fonts/Roboto-Regular.ttf");
}

html {
    font-family: "Roboto", sans-serif;
    font-size: 14px;

    @media (max-width: 500px) {
        font-size: 13px;
    }
}

.body {
    padding: 0;
    margin: 0;
    overscroll-behavior-y: none;

    &__wrap {
        width: 500px;
        max-width: 98%;
        height: 100vh;
        margin: auto;
    }
}
</style>
