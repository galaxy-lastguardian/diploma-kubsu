<template>
    <div class="page-loader" v-if="this.$store.state.isloading">
        <div v-if="!this.$store.state.isaborted">
            <v-row>
                <v-col
                    cols="12"
                    class="d-flex justify-center"
                >
                    <v-progress-circular
                        :size="120"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </v-col>
                <v-col
                    cols="12"
                    class="d-flex justify-center"
                >
                    <v-btn
                        v-on:click.prevent="abortFetching"
                        color="red"
                        text
                    >Отмена</v-btn>
                </v-col>
            </v-row>
        </div>
        <div v-if="this.$store.state.isaborted">
            <v-btn
                v-on:click.prevent="fetchArticles"
                color="orange"
                text
            >Повторить загрузку</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLoader',
    methods: {
        abortFetching() {
            this.$store.dispatch('abortFetching')
        },
        fetchArticles() {
            this.$store.dispatch('fetchArticles')
        }
    }
}
</script>

<style>
    .page-loader{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 999;
    }
</style>