<template>
    <Breadcrumb v-if="withBreadcrumb"/>
    <div class="header__container">
        <div class="header__title">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <div
            v-if="withActions"
            class="header__actions"
        >
            <Switch
                v-model="favorites"
                label="Apenas Favoritos"
            />
            <Select
                v-model="orderBy"
                :options="options"
            />
            <slot name="right" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Breadcrumb from './Breadcrumb.vue';
import Switch from './Switch.vue';
import Select from './Select.vue';

const options = [
    {
        label: 'Ordem alfabética',
        value: 'name',
    },
    {
        label: 'Projetos iniciados mais recentemente',
        value: 'startDate',
    },
    {
        label: 'Próximos à data de finalização',
        value: 'endDate',
    },
];

const emits = defineEmits(['favorites-toggle', 'order-change']);

defineProps({
    title: {
        type: String,
        default: 'Projetos',
    },
    withBreadcrumb: {
        type: Boolean,
        default: false,
    },
    withActions: {
        type: Boolean,
        default: false,
    },
});

const favorites = ref(false);
const orderBy = ref(localStorage.getItem('orderBy') || 'name');

watch(() => favorites.value, () => {
    localStorage.setItem('favorites', favorites.value);
    emits('favorites-toggle', favorites.value);
});
watch(() => orderBy.value, () => {
    localStorage.setItem('orderBy', orderBy.value);
    emits('order-change');
});
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.header {
    &__actions {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    &__container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        @include title;
    }
}
</style>
