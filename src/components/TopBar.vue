<template>
    <div
        v-if="!showSearchInput"
        class="top-bar"
    >
        <div
            class="top-bar__logo"
            @click="$emit('home')"
        >
            <img src="/images/logo.png">
            <div>
                Gerenciador de Projetos
            </div>
        </div>
        <div
            v-if="!hideSearch"
            class="top-bar__icon"
            @click="handleSearchClick"
        >
            <img src="/images/search.svg">
        </div>
    </div>
    <div
        v-else
        class="top-bar__search"
    >
        <img src="/images/search.svg">
        <input
            ref="searchInput"
            type="text"
            placeholder=""
            @input="handleSearchInput"
            @keydown.esc="showSearchInput = false"
        >
    </div>
</template>

<script setup>
import { ref, watch, useTemplateRef, nextTick } from 'vue';
import useSearchStore from '../store/search';
import { useRouter, useRoute } from 'vue-router';

const emits = defineEmits(['search', 'home']);
const searchInput = useTemplateRef('searchInput');
const searchStore = useSearchStore();
const searchDebounceTimer = ref(null);
const router = useRouter();
const currentRoute = useRoute();

defineProps({
    hideSearch: {
        type: Boolean,
        default: false,
    },
    mode: {
        type: String,
        default: 'bar',
        validator: (value) => {
            return ['bar', 'search'].includes(value);
        },
    }
});

const showSearchInput = ref(false);

watch(() => currentRoute.name, () => {
    if (currentRoute.name === 'SearchResults') {
        return;
    }
    
    showSearchInput.value = false;
});

function handleSearchClick() {
    showSearchInput.value = true;

    nextTick(() => {
        searchInput.value.focus();
    })
}

function handleSearchInput(event) {
    if (event.target.value.length < 3) {
        return;
    }

    if (searchDebounceTimer.value) {
        clearTimeout(searchDebounceTimer.value);
    }

    searchDebounceTimer.value = setTimeout(() => {
        searchStore.searchString = event.target.value;

        if (currentRoute.name === 'SearchResults') {
            return;
        }

        router.push({ name: 'SearchResults' });
    }, 2000);
}
</script>

<style lang="scss" scoped>
.logo {
    &__title {
        max-width: 109px;
    }
}
.top-bar {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: #1C1930;
    border: 1px solid #000000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;

    &__logo {
        color: #FFFFFF;
        font-weight: 400;
        font-size: 18px;
        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        div {
            max-width: 109px;
        }

        img {
            width: 72px;
            height: 72px;
        }
    }

    &__icon {
        position: absolute;
        right: 4%;
        user-select: none;
        cursor: pointer;

        img {
            width: 18px;
            height: 18px;
        }
    }

    &__search {
        position: relative;
        width: 100%;
        height: 80px;
        background-color: white;
        border: 1px solid #000000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: flex;
        align-items: center;
        padding-left: 32px;
        gap: 24px;

        img {
            filter: brightness(0) saturate(100%) invert(37%) sepia(82%) saturate(726%) hue-rotate(214deg) brightness(87%) contrast(87%);
            width: 18px;
            height: 18px;
        }

        input {
            width: 100%;
            height: 100%;
            font-size: 18px;
            box-sizing: border-box;
            border: none;

            &:focus {
                outline: none;
            }
        }
    }
}
</style>
