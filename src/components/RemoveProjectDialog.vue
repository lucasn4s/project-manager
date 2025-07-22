<template>
    <div class="backdrop">
        <div class="dialog">
            <div class="dialog__icon">
                <img src="/images/trash.svg">
            </div>
            <div class="dialog__title">
                Remover projeto
            </div>
            <div class="divider" />
            <div class="dialog__caption">
                Essa ação removerá definitivamente o projeto:
            </div>
            <div class="dialog__name">
                {{ projectName }}
            </div>
            <div class="dialog__actions">
                <Button
                    text="Cancelar"
                    fluid
                    small
                    secondary
                    @click="emits('close')"
                />
                <Button
                    text="Confirmar"
                    fluid
                    small
                    @click="emits('confirm')"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from './Button.vue';

const emits = defineEmits(['close', 'confirm']);

defineProps({
    projectName: {
        type: String,
        default: 'Nome do projeto',
    },
});
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.dialog {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 582px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 48px 32px 32px 32px;

    &__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 32px;
        margin-top: 20px;
        width: 100%;
    }

    &__caption {
        @include caption;
    }

    &__icon {
        position: absolute;
        top: 0;
        left: 50%;
        background-color: var(--primary);
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(-50%, -50%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        img {
            filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(2%) hue-rotate(20deg) brightness(106%) contrast(101%);
        }
    }

    &__name {
        font-size: 24px;
        font-weight: 500;
        color: #1C1930;
    }

    &__title {
        @include title;
        font-size: 22px;
    }
}

.divider{
    width: 100%;
    border: 1px solid #ECECEC;
    margin: 12px 0 22px 0;
}
</style>
