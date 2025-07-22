<template>
    <div class="switch__container">
        <label class="switch">
            <input
                v-model="internalValue"
                type="checkbox"
            >
            <span class="switch__slider" />   
        </label>
        <div
            class="switch__label"
            @click="internalValue = !internalValue"
        >
            {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
const internalValue = defineModel({
    type: Boolean,
    default: false,
});

defineProps({
    label: {
        type: String,
        default: '',
    },
});
</script>

<style lang="scss" scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;

    &__container {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__label {
        font-weight: 400;
        font-size: 16px;
        color: #1C1930;
        line-height: 22px;
        cursor: pointer;
    }
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    &__slider {
        border-radius: 34px;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #53525D;
        -webkit-transition: .4s;
        transition: .4s;

        &:before {
            position: absolute;
            border-radius: 50%;
            background-color: white;
            content: "";
            height: 12px;
            width: 12px;
            left: 6px;
            bottom: 6px;
            -webkit-transition: .4s;
            transition: .4s;
        }
    }
}

input:checked + .switch__slider {
    background-color: #FFB23D;
}

input:checked + .switch__slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
    background-color: white;
}
</style>
