<template>
    <div>
        <div :class="resolveElementClass('label')">
            <label for="text-input">
                {{ label }}
            </label>
            <span
                v-if="required"
                :class="resolveElementClass('required')"
            >
                (Obrigatório)
            </span>
        </div>
        <div :class="resolveElementClass()">
            <input
                v-if="mask"
                v-model="internalValue"
                v-mask="mask"
                :placeholder="placeholder"
                id="text-input"
                type="text"
            />
            <input
                v-else
                v-model="internalValue"
                :placeholder="placeholder"
                id="text-input"
                type="text"
            />
            <div
                v-if="appendIconSrc"
            >
                <img
                    :src="appendIconSrc"
                    :class="resolveElementClass('append')"
                >
            </div>
        </div>
        <div
            v-if="state === 'error'"
            class="input__error"
        >
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
const internalValue = defineModel({
    type: String,
    default: '',
});

const { state } = defineProps({
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    state: {
        type: String,
        default: '',
        validator: (value) => ['default', 'error'].includes(value),
    },
    errorMessage: {
        type: String,
        default: '',
    },
    mask: {
        type: String,
        default: '',
    },
    appendIconSrc: {
        type: String,
        default: '',
    },
});

function resolveElementClass(elementName) {
    return state === 'error'
    ? `input${elementName ? '__'+elementName : ''}--invalid`
    : `input${elementName ? '__'+elementName : ''}`
}
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.input {
    height: 40px;
    width: 100%;
    border: 1px solid var(--secondary);
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;

    input {
        border: none;
        width: 100%;

        &:focus {
            outline: none;
        }
    }

    &--invalid {
        @extend .input;
        border-color: var(--error);

        input {
            color: var(--error);
        }
    }

    &__append {
        &--invalid {
            filter: brightness(0) saturate(100%) invert(8%) sepia(88%) saturate(6882%) hue-rotate(360deg) brightness(101%) contrast(108%);
        }
    }

    &__label {
        @include label;
        
        &--invalid {
            @extend .input__label;
            color: var(--error-text);
        }
    }
    
    &__error {
        @include required-indicator;
        color: var(--error-text);
    }
    
    &__required {
        @include required-indicator;
        margin-left: 8px;

        &--invalid {
            @extend .input__required;
            color: var(--error);
        }
    }
}
</style>
