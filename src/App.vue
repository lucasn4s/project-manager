<template>
    <TopBar
        :hide-search="currentRoute.name === 'NewProject'"
        @home="router.push({ name: 'Projects' })"
    />
    <RouterView />
</template>

<script setup>
import TopBar from './components/TopBar.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const currentRoute = useRoute();
</script>

<style scoped>
</style>
