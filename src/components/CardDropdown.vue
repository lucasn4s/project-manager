<template>
    <div
        :id="dropdownId"
        class="dropdown"
        @click.stop="isActive = !isActive"
        @keydown.esc="isActive = false"
    >
        <IconButton
            icon-src="/images/dot-icon.svg"
        />
        <div
            v-if="isActive"
            class="popover"
        >
            <div
                class="popover__option"
                @click="emits('edit')"
            >
                <img
                    src="/images/edit.svg"
                    width="24"
                    height="24"
                >
                Editar
            </div>
            <div class="divider"/>
            <div
                class="popover__option"
                @click="emits('remove')"
            >
                <img
                    src="/images/trash.svg"
                    width="24"
                    height="24"
                >
                Remover
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import IconButton from './IconButton.vue';

const emits = defineEmits(['edit', 'remove']);

const isActive = ref(false);
const dropdownId = ref('');

onMounted(() => {
    dropdownId.value = `dropdown-${Math.random().toString(36).slice(7)}`;
    const listener = document.addEventListener('click', (event) => {
        if (!event.target.closest(`#${dropdownId.value}`)) {
            isActive.value = false;
        }
    });
});

onBeforeUnmount(() => {
    document.removeEventListener('click', (event) => {
        if (!event.target.closest(`#${dropdownId.value}`)) {
            isActive.value = false;
        }
    });
});
</script>

<style lang="scss" scoped>
.divider{
    width: 100%;
    border: 1px solid #ECECEC;
}

.popover {
    position: absolute;
    min-width: 240px;
    top: 120%;
    right: 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);

    &__option {
        padding: 20px 12px;
        display: flex;
        gap: 12px;
        align-items: center;
        cursor: pointer;
        color: var(--primary);

        &:hover {
            color: var(--primary-hover);
        }
    }
}
</style>

