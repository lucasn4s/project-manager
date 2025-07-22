<template>
    <select
        v-model="selectedOption"
        class="select"
    >
        <option
            v-if="placeholder"
            value=""
            disabled
            selected
        >
            {{ placeholder }}
        </option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<script setup lang="ts">
const selectedOption = defineModel({
    type: String,
    default: 'name',
});

defineProps({
    placeholder: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        default: [],
    }
});
</script>

<style lang="scss" scoped>
.select {
    background-color: white;
    border: 1px solid #000000;
    border-radius: 8px;
    padding: 12px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    cursor: pointer;
    color: var(--secondary);
}
</style>
