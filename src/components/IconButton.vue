<template>
    <div
        class="icon-button"
        @click="emits('click')"
    >
        <img
            class="icon-button__content"
            :src="iconSrc"
            width="20"
            height="20"
        />
    </div>
</template>

<script setup>
const emits = defineEmits(['click']);

defineProps({
    iconSrc: {
        type: String,
        default: null,
    },
})
</script>

<style lang="scss" scoped>
.icon-button {
    cursor: pointer;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;;

    &__content {
        color: var(--primary);
        letter-spacing: 1px;
        font-weight: 700;
    }
}
</style>
