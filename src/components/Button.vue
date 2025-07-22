<template>
    <div
        :class="computedClass + (fluid ? ' button--fluid' : '') + (secondary ? ' button--secondary' : '')"
        @click.prevent="handleButtonClick"
    >
        <img
            v-if="iconImg"
            :src="iconImg"
            width="24"
            height="24"
        />
        {{ text }}
    </div>
</template>

<script setup>
import { computed } from 'vue';

const emits = defineEmits(['click']);

const { disabled, small } = defineProps({
    text: {
        type: String,
        default: 'Novo projeto',
    },
    iconImg: {
        type: String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
    fluid: {
        type: Boolean,
        default: false,
    },
});

const computedClass = computed(() => {
    if (disabled) {
        return small ? 'button--disabled button--small' : 'button--disabled'; 
    }

    return small ? 'button button--small' : 'button';
});

function handleButtonClick(event) {
    if (disabled) {
        return;
    }

    emits('click', event);
}
</script>

<style lang="scss" scoped>
.button {
    background-color: var(--primary);
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 26px;
    cursor: pointer;
    padding: 15px 32px;
    font-size: 20px;
    line-height: 22px;
    gap: 16px;
    width: 100%;

    &--disabled {
        @extend .button;
        cursor: not-allowed;
        background-color: #B2A8FF;

        &:hover {
            background-color: #B2A8FF !important;
        }
    }

    &--fluid {
        width: 100% !important;
    }

    &:hover {
        background-color: var(--primary-hover);
    }

    &--secondary {
        background-color: white;
        color: var(--primary) ;
        border: 1px solid var(--primary);

        &:hover {
            background-color: white;
            color: var(--primary-hover);
            border: 1px solid var(--primary-hover);
        }
    }

    &--small {
        @extend .button;
        padding: 9px 27px;
        font-size: 16px;
        line-height: 24px;
        gap: 8px;
        width: fit-content;
    }
}
</style>
