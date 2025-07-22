<template>
    <div class="card__container">
        <div class="card__header">
            <img
                class="card__image"
                :src="computedImageUrl"
                alt=""
            >
            <div class="card__actions">
                <img
                    class="card__favorite"
                    :src="computedFavoriteStar"
                    width="20"
                    height="20"
                    @click="emits('favorite')"
                >
                <CardDropdown
                    @edit="emits('edit')"
                    @remove="emits('remove')"
                />
            </div>
        </div>
        <div class="card__body">
            <div class="card__title">
                {{ name }}
            </div>
            <div class="card__caption">
                <span class="card__customer">
                    Cliente:
                </span>
                {{ customer }}
            </div>
            <div class="divider" />
            <div class="card__date">
                <img
                    src="/images/calendar-day-light.svg"
                >
                {{ startDate }}
            </div>
            <div class="card__date">
                <img
                    src="/images/calendar-check-light.svg"
                >
                {{ endDate }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import CardDropdown from './CardDropdown.vue';

const emits = defineEmits(['edit', 'remove', 'favorite']);

const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    customer: {
        type: String,
        default: '',
    },
    startDate: {
        type: String,
        default: '',
    },
    endDate: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: String,
        default: '',
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
});

const computedImageUrl = computed(() => props.imageUrl || '/images/card-placeholder.png');
const computedFavoriteStar = computed(() => props.isFavorite ? '/images/filled-star.png' : '/images/empty-star.svg');
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.card {
    &__actions {
        display: flex;
        gap: 16px;
        align-items: center;
        position: absolute;
        bottom: 16px;
        right: 16px;
    }

    &__body {
        border: 1px solid #DCDCDC;
        border-radius: 0 0 16px 16px;
        background-color: white;
        padding: 24px;
        height: 199px;
        box-sizing: border-box;
    }

    &__caption {
       color: var(--secondary); 
       font-size: 16px;
    }

    &__container {
        border-radius: 16px;
        min-width: 300px;
    }

    &__customer {
        font-weight: 700;
    }

    &__date {
        display: flex;
        gap: 16px;
        color: var(--secondary);
        align-items: center;
        margin-bottom: 16px;
    }

    &__favorite {
        cursor: pointer;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    &__header {
        position: relative;
        height: 232px;
        width: 100%;
    }

    &__image {
        border-radius: 16px 16px 0 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__title {
        @include title;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.divider{
    width: 100%;
    border: 1px solid #ECECEC;
    margin: 16px 0;
}
</style>
