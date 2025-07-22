<template>
    <div
        class="breadcrumb"
        @click="router.back()"
    >
        <img src="/images/arrow-left.svg">
        Voltar
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: var(--primary-hover);
    }

    img {
        width: 16px;
        height: 16px;
    }
}
</style>
