<template>
    <div class="empty-state">
        <h1 class="empty-state__title">
            Nenhum projeto
        </h1>
        <h2 class="empty-state__caption">
            Clique no botão abaixo para criar o primeiro e gerenciá-lo.
        </h2>
        <div class="empty-state__button">
            <Button
                text="Novo projeto"
                icon-img="/images/plus-circle.svg"
                @click="emits('new-project')"
            />
        </div>
    </div>
</template>

<script setup>
import Button from './Button.vue';

const emits = defineEmits(['new-project']);
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.empty-state {
    background-color: white;
    border-radius: 4px;
    width: 100%;
    min-height: 75vh;
    display: flex;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__button {
        margin-top: 8px;
    }

    &__caption {
        @include caption;
    }

    &__title {
        @include title;
    }
}
</style>
