<template>
    <div>
        <div class="file-input__label">
            {{ label }}
        </div>
        <div class="file-input__container">
            <div
                v-if="!selectedFile"
                class="file-input__wrapper"
            >
                <img
                    src="/images/upload-light.svg"
                    alt="Upload"
                />
                <div class="file-input__text">
                    Escolha uma imagem .jpg ou .png no seu dispositivo
                </div>
                <input
                    type="file"
                    :id="inputId"
                    :accept="accept"
                    @change="handleFileChange"
                />
                <label :for="inputId" class="file-input__button">
                    Selecionar
                </label>
            </div>
            <div
                v-if="selectedFile"
                class="preview__container"
            >
                <img
                    :src="previewUrl"
                    class="preview__img"
                />
                <IconButton
                    class="preview__delete"
                    iconSrc="/images/trash.svg"
                    @click="selectedFile = null"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import IconButton from './IconButton.vue';

const selectedFile = defineModel({
    type: [File, String],
    default: null,
});

const props = defineProps({
    accept: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    }
});

const inputId = `file-input-${Math.random().toString(36).slice(7)}`;
const previewUrl = ref('');

watch(selectedFile, (value) => {
    if (!value && previewUrl.value) {
        return;
    }

    previewUrl.value = value;
});

function handleFileChange(event) {
    const files = event.target.files;
    if (files.length) {
        selectedFile.value = files[0];
        previewUrl.value = URL.createObjectURL(selectedFile.value);
    }
};
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.file-input {
    &__button {
        cursor: pointer;
        background-color: white;
        color: var(--primary);
        border: 1px solid var(--primary);
        padding: 8px 32px;
        border-radius: 26px;
    }

    &__container {
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    &__label {
        @include label;
    }

    &__text {
        @include caption;
        margin-bottom: 8px;
    }

    &__wrapper {
        width: 100%;
        display: flex;
        gap: 16px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px dashed var(--secondary);
        border-radius: 4px;
        padding: 24px 0;
    }
}

input[type="file"] {
    display: none;
}

.preview {
    &__container {
        border: 1px solid var(--secondary);
        box-sizing: border-box;
        min-width: 200px;
        min-height: 200px;
        display: flex;
        justify-content: center;
        border-radius: 8px;
        position: relative;
    }

    &__delete {
        position: absolute;
        top: 24px;
        right: 24px;
    }

    &__img {
        max-height: 400px;
        max-width: 700px;
        object-fit: scale-down;
        border-radius: 8px;
    }
}
</style>

